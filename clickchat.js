"use strict";

(function (clickchat, $, undefined) {
    // To get a private MUC name, 
    //Due to bug of Converse, DO NOT use uppercase character in JID!!!!!!!!!!!!
    clickchat.private_muc_name = "sales@role.bizchat.us";
    clickchat.common_muc_nick = "Me";

    clickchat.sendChatRoomMessage = function (room,nick, text) {
        clickchat.sendMessage('groupchat', room,nick, text);
    }

    clickchat.sendMessage = function (msgType, jid, nick,text) {
        var msg = $msg({
            from: jid+"/"+nick,// Improvement later
            to: jid,
            type: msgType
        }).c("body").t(text).up()
          .c("x", { xmlns: "jabber:x:event" }).c("composing");

        converse.send(msg);
    }

   function join(roomID, nick, history_attrs, extended_presence) {
       var stanza = $pres({
            to: roomID + "/" + nick
        }).c("x", {
            xmlns: Strophe.NS.MUC
        });

        return converse.send(stanza);
    }

    // This function is API
    clickchat.startNewTopic = function (msgType, room, newSubject, imageLink) {
        
        clickchat.private_muc_name = room;

        if (msgType == "groupchat") {
            focusRoom(clickchat.private_muc_name);
           
        }

        ////converse.room.join(clickchat.private_muc_name, clickchat.common_muc_nick);
        changeTopic(clickchat.private_muc_name,clickchat.common_muc_nick, "groupchat", newSubject);

        if (imageLink != "") {
           clickchat. sendChatRoomMessage(clickchat.private_muc_name,clickchat.common_muc_nick, imageLink);
        }

        //remindTemplateRoom(newSubject,imageLink);

    }

    // This function is to change subject of a MUC
    function changeTopic(jid,nick, msgType, newSubject) {
        var msg = $msg({
            //from: jid+"/"+nick,
            to: jid,
            type: msgType
        }).c("subject", { xmlns: "jabber:client" }).t(newSubject);

        return converse.send(msg);
    }

    // This function is to open the assigned room
    function focusRoom(roomID) {
        var room = converse.rooms.get(roomID);

        if ((typeof room == "undefined") || (room == null)) {
            debugger;

            room = converse.rooms.open(roomID, clickchat.common_muc_nick);
            //room = converse.rooms.open(roomID);
            //join(roomID, clickchat.common_muc_nick, "Available");
        }

        room.maximize();
    }

    var reminded = false;

//    function remindTemplateRoom(userMsg, imageLink) {
////        debugger;

//        if (reminded === true) return;
        
//        reminded = true;

//        join(clickchat_config.template_muc_name, clickchat.common_muc_nick);

//        //join(clickchat.private_muc_name, clickchat.common_muc_nick);

//        //clickchat.sendChatRoomMessage(clickchat.private_muc_name, "Please introduce yourself and describe your questions at first");

//        if (userMsg) {
//            clickchat.sendChatRoomMessage(clickchat_config.template_muc_name, clickchat.common_muc_nick, "My initial topic is:" + userMsg);
//        }

//        if (imageLink) {
//            clickchat.sendChatRoomMessage(clickchat_config.template_muc_name, clickchat.common_muc_nick, imageLink);
//        }

//        clickchat.sendChatRoomMessage(clickchat_config.template_muc_name, clickchat.common_muc_nick, "Please join me at:  xmpp:" + clickchat.private_muc_name + "?join");
               
//    }

    var inited = false;

    clickchat.Init = function () {
        if (!inited) {
            //converse.listen.on('initialized', function (event) {
            //    //var room = converse.rooms.open(clickchat.private_muc_name, clickchat.common_muc_nick);
            //    ////room.minimize();

            //    afterInitialized();
            //});

            converse.initialize({
                bosh_service_url: 'https://bizchat.us/http-bind/', // Please use this connection manager only for testing purposes
                i18n: locales['en'], // Refer to ./locale/locales.js to see which locales are supported
                keepalive: true,
                play_sounds: true,
                roster_groups: true,
                debug: true,
                xhr_user_search: false,
                authentication:'anonymous',// 'login',//'anonymous',
                auto_login:true,// false,//true,
                jid: 'guest.bizchat.us', //'bizchat.us',//'guest.bizchat.us',
                show_controlbox_by_default: false,
                forward_messages: true
            });

            //afterInitialized();

            inited = true;
        }
    }

}(window.clickchat = window.clickchat || {}, jQuery));

