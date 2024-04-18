<template>
    <div></div>
</template>

<script>
export default {
    name: "urlLogin",
    mounted() {
        this.login();
    },
    methods: {
        async login() {
            try {
                const response = await this.$axios.post(`/user/login/${this.$route.params.encryptedData}`, {}, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status != 200) throw new Error("Invalid email or password");
                const accessToken = response.data.data.accessToken;
                const email = response.data.data.email;
                const id = response.data.data.id;
                const name = response.data.data.name;
                const title = response.data.data.title;
                const division = response.data.data.division;
                const branch = response.data.data.branch;
                const division_id = response.data.data.division_id;
                const branch_id = response.data.data.branch_id;

                if (this.right) {
                    Cookies.set("token", accessToken, { expires: 365 }); // Cookie berlaku selama 1 tahun
                    Cookies.set("id", id, { expires: 365 });
                    Cookies.set("email", email, { expires: 365 });
                    Cookies.set("username", name, { expires: 365 });
                    Cookies.set("title", title, { expires: 365 });
                    Cookies.set("division", division, { expires: 365 });
                    Cookies.set("branch", branch, { expires: 365 });
                    Cookies.set("division_id", division_id, { expires: 365 });
                    Cookies.set("branch_id", branch_id, { expires: 365 });
                } else {
                    sessionStorage.setItem("token", accessToken);
                    sessionStorage.setItem("id", id);
                    sessionStorage.setItem("email", email);
                    sessionStorage.setItem("username", name);
                    sessionStorage.setItem("title", title);
                    sessionStorage.setItem("division", division);
                    sessionStorage.setItem("branch", branch);
                    sessionStorage.setItem("division_id", division_id);
                    sessionStorage.setItem("branch_id", branch_id);
                }
                this.redirectUser(title);

                this.$q.notify({
                    color: "positive",
                    message: "Login Successful.",
                });
            } catch (error) {
                console.error("Error signing in:", error);

                this.$q.notify({
                    color: "negative",
                    position: "top",
                    message: "Invalid email or password",
                });
            }
        },
    }
};
</script>

<style scoped></style>