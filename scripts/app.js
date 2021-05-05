const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        activeUser: {},
        query: "",
        myMessage: ""
    },
    computed: {
        searchForText: function() {
            return this.usersList.filter(element => element.name.toLowerCase().includes(this.query.toLowerCase()))
            .map((element) => {
                if (this.query == "")
                    return element;

                return {
                    name: element.name,
                    avatar: element.avatar,
                    visible: element.visible,
                    messages: element.messages
                }
            })
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
                date: moment(),
                text: this.myMessage,
                status: 'sent'
            });
            //LA FUNZIONE NON FUNZIONA
            setTimeout(() => {
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