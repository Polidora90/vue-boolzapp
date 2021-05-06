const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        activeUser: {},
        query: "",
        myMessage: "",
    },
    computed: {
        searchForText: function () {
            return this.usersList.filter(element => element.name.toLowerCase().includes(this.query.toLowerCase()))
            /* .map((element) => {
                if (this.query == "")
                    return element;

                return {
                    name: element.name,
                    avatar: element.avatar,
                    visible: element.visible,
                    messages: element.messages
                }
            }) */
        },
        selectedUserLastAccess() {
            if (!this.activeUser.messages) {
                return "";
            };

            const receivedMsg = this.activeUser.messages.filter((msg) => msg.status === 'received');

            const lastMsg = receivedMsg[receivedMsg.length - 1];

            if (!lastMsg) {
                return "";
            }

            const lastMsgDate = lastMsg.date;

            return this.formatTime(lastMsgDate);
        }
    },
    methods: {
        selectUserChat(user) {
            this.activeUser = user;
        },
        formatTime(stringDate) {
            return moment(stringDate, "DD/MM/YYYY HH:mm:ss").format("HH:mm");
        },
        sendMsg() {
            this.activeUser.messages.push({
                date: moment().format("DD/MM/YYYY HH:mm:ss"),
                text: this.myMessage,
                status: 'sent'
            });

            this.myMessage = "";

            setTimeout(() => {
                this.activeUser.messages.push({
                    date: moment(),
                    text: "Ok!",
                    status: 'received'
                });
            }, 1000);

        },
        showPopup(msg) {
            msg.popup = !msg.popup;
        },
        deleteMessage(index) {
            this.activeUser.messages.splice(index, 1);
        }
    },
    mounted() {
        this.activeUser = this.usersList[0];
    }
});