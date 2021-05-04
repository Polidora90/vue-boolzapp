const app = new Vue({
    el: "#app",
    data: {
        usersList: globalUsersList,
        activeUser: "",
    },
    methods: {
        selectUserChat(user) {
            this.activeUser = user;
        }
    },
    mounted() {
        this.activeUser = this.usersList[0];
    }
});