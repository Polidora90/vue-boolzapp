const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        activeUser: {},
        myMessage: ""
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
                date: moment(),
                text: this.myMessage,
                status: 'sent'
            });
            setTimeout(function(){
                this.activeUser.messages.push({
                    date: moment(),
                    text: "Ok!",
                    status: 'received'
                });
            }, 1000);

        }
    },
    mounted() {
        this.activeUser = this.usersList[0];
    }
});