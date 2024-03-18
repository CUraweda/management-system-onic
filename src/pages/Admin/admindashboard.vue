<template>
  <q-layout view="lHh Lpr lff">
    <div class="q-pa-md">
      <div class="flex items-center q-gutter-sm q-pb-md">
        <q-btn
          label="Add New User"
          @click="openDialogUser()"
          color="cyan"
          no-caps
        />
        <q-dialog v-model="dialogUser">
          <q-card style="width: 700px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">{{ titleAddUser }}</div>
              <q-space />
              <q-btn no-caps color="cyan" @click="handleAction()">{{
                addUser
              }}</q-btn>
            </q-card-section>

            <q-card-section
              style="display: flex; gap: 10px; width: 100%"
              class="col-grow"
            >
              <div class="full-width">
                <q-input
                  dense
                  outlined
                  v-model="name"
                  label="Name"
                  class="col-grow text-bold"
                />
                <q-input
                  dense
                  outlined
                  v-model="email"
                  label="Email"
                  class="col-grow text-bold q-mt-md"
                />

                <q-input
                  v-model="password"
                  dense
                  outlined
                  v-if="passwordIf"
                  class="q-mt-md"
                  :type="isPwd ? 'password' : 'text'"
                  label="Password"
                  placeholder="Enter at least 8+ characters"
                  :rules="[(val) => (val !== null && val !== '') || 'Required']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="togglePwdVisibility"
                    />
                  </template>
                </q-input>
              </div>
              <div class="full-width">
                <q-select
                  outlined
                  dense
                  v-model="divisi"
                  :options="optionsDivisi"
                  label="Divisi"
                  class="col-grow"
                />
                <div class="q-mt-md" style="display: flex; gap: 10px">
                  <q-select
                    outlined
                    dense
                    v-model="jabatan"
                    :options="optionsJabatan"
                    style="width: 70px"
                    label="Jabatan"
                    class="col-grow"
                  />
                </div>
                <q-input
                  v-model="confirmPassword"
                  dense
                  outlined
                  v-if="confirmPasswordIf"
                  :type="isConfirmPwd ? 'password' : 'text'"
                  label="Confirm Password"
                  class="q-mt-md"
                  placeholder="Enter at least 8+ characters"
                  :rules="[(val) => (val !== null && val !== '') || 'Required']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="toggleConfirmPwdVisibility"
                    />
                  </template>
                </q-input>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-btn
          label="Import From Excel"
          @click="openDialogImport"
          color="cyan"
          no-caps
        />
        <q-dialog v-model="uploadExcel">
          <q-card>
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Upload Excel File</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
              <q-file
                v-model="fileTask"
                label="Upload File"
                filled
                text-color="black"
                style="width: 400px"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn label="Submit" @click="sendExcel" color="cyan" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      <q-table
        class="no-shadow q-ml-md"
        :data="rows"
        :rows-per-page-options="[0]"
        hide-bottom
        :hide-header="grid"
        :columns="columns"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="Name" :props="props">
              <div>{{ props.row.u_name }}</div>
            </q-td>

            <q-td key="Divisi" :props="props">
              <div>{{ props.row.division }}</div>
            </q-td>

            <q-td key="Jabatan" :props="props">
              <div>{{ props.row.title }}</div>
            </q-td>

            <q-td key="Email" :props="props">
              <div>{{ props.row.u_email }}</div>
            </q-td>
            <q-td key="Action" :props="props" style="width: 10px">
              <div class="q-gutter-sm">
                <q-btn
                  dense
                  class="under-title q-px-sm text-green"
                  rounded
                  no-caps
                  unelevated
                  color="green-2"
                  label="Edit"
                  @click="setButton(props.row, 'edit')"
                />
                <q-btn
                  dense
                  class="under-title q-px-sm text-red"
                  rounded
                  no-caps
                  unelevated
                  color="red-2"
                  text-color="red"
                  label="Delete"
                  @click="setButton(props.row, 'delete')"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      fileTask: ref(null),
      uploadExcel: ref(false),
      addUser: ref(),
      titleAddUser: ref(),
      passwordIf: ref(true),
      confirmPasswordIf: ref(true),
      token: ref(localStorage.getItem("token")),
      name: ref(),
      email: ref(),
      divisi: ref(),
      optionsDivisi: [
        { label: "Acc & Purchase", value: "Acc & Purchase" },
        { label: "Operasional Sales", value: "Operasional Sales" },
        { label: "Produksi", value: "Produksi" },
        { label: "HRD & GA", value: "HRD & GA" },
        { label: "Marketing", value: "Marketing" },
      ],
      jabatan: ref(),
      optionsJabatan: [
        { label: "Admin", value: "admin" },
        { label: "Direktur", value: "direktur" },
        { label: "Manager", value: "manager" },
        { label: "Supervisor", value: "supervisor" },
        { label: "Operator", value: "operator" },
      ],
      isPwd: true,
      isConfirmPwd: true,
      password: ref(),
      confirmPassword: ref(),
      dialogUser: ref(false),
      currentShownId: 0,
      pagination: {
        page: 1,
        rowsPerPage: 0, // jumlah item per halaman
      },
      rows: ref(),
    };
  },
  setup() {
    const columns = [
      { name: "Name", label: "Nama", align: "center", field: "u_name" },
      { name: "Divisi", label: "Divisi", align: "center", field: "division" },
      { name: "Jabatan", label: "Jabatan", align: "center", field: "title" },
      { name: "Email", label: "Email", align: "center", field: "u_email" },
      { name: "Action", label: "Action", align: "center", field: "id" },
    ];
    return {
      columns,
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    dialogUser: {
      handler(value) {
        // console.log(value);
        if (value != true) this.clearInput();
      },
    },
  },
  methods: {
    togglePwdVisibility() {
      this.isPwd = !this.isPwd;
    },
    toggleConfirmPwdVisibility() {
      this.isConfirmPwd = !this.isConfirmPwd;
    },
    openDialogImport() {
      this.uploadExcel = true;
    },
    openDialogUser(edit = false) {
      this.divisi = this.optionsDivisi[0];
      this.jabatan = this.optionsJabatan[0];
      this.dialogUser = true;
      this.passwordIf = true;
      this.confirmPasswordIf = true;
      this.titleAddUser = edit ? "Edit User" : "Add User";
      this.addUser = edit ? "Edit User" : "Add User";
      this.editing = edit;
    },
    //Button Setter
    setButton(rowData, act) {
      this.currentShownId = rowData.id;
      console.log(this.currentShownId);
      act != "edit" ? "" : this.setEditUser();
      act != "delete" ? "" : this.deleteUser();
    },
    handleAction() {
      if (this.editing == true) {
        this.sendEdit();
      } else {
        this.createUser();
      }
    },
    //Input nuller
    clearInput() {
      console.log("hghghjghjg");
      const listOfModel = [
        "name",
        "email",
        "password",
        "jabatan",
        "divisi",
        "confirmPassword",
      ];
      for (let index of listOfModel) {
        console.log(this[index]);
        this[index] = null;
      }
    },

    async getData() {
      try {
        if (!this.token) throw Error("You must be log in");
        const response = await this.$axios.get(`/user/all`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.status === 200) {
          const { data } = response;
          this.rows = data.map((user) => ({
            id: user.u_id,
            u_name: user.u_name ? user.u_name : "",
            division: user.division ? user.division : "",
            title: user.title ? user.title : "",
            u_email: user.u_email ? user.u_email : "",
          }));
        }
      } catch (err) {
        console.error(err);
      }
    },

    //EDIT START
    async setEditUser() {
      try {
        const { data, status } = await this.$axios.get(
          `/user/get-by-id/${this.currentShownId}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (status != 200) {
          throw Error("Error while fetching data please try again");
          //TODO: CLOSE DIALOG
        }
        this.openDialogUser(true);
        this.passwordIf = false;
        this.confirmPasswordIf = false;
        this.name = data.u_name;
        this.email = data.u_email;
        this.divisi = data.division;
        this.jabatan = data.title;
      } catch (err) {
        console.log(err);
        return this.$q.notify({ message: err.message });
      }
    },
    async sendEdit() {
      try {
        const { data, status } = await this.$axios.put(
          `/user/update-user/${this.currentShownId}`,
          {
            u_name: this.name,
            u_email: this.email,
            division: this.divisi,
            title: this.jabatan,
          }
        );
        if (status != 200) throw Error(data.message);
        console.log(this.jabatan.value);
        this.dialogUser = true;
        return this.$q.notify({ message: data.message });
      } catch (err) {
        console.log(err);
        return this.$q.notify({ message: err.message });
      }
    },
    //EDIT EN

    //DELETE START
    async deleteUser() {
      try {
        const { status, data } = await this.$axios.delete(
          `/user/delete-user/${this.currentShownId}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (status == 200) {
          this.getData();
        }
        if (status != 200) throw Error(data);
        return this.$q.notify({ message: data });
      } catch (err) {
        console.log(err);
        return this.$q.notify({ message: err.message });
      }
    },
    //DELETE END
    async createUser() {
      try {
        const { status, data } = await this.$axios.post(
          "/user/register",
          {
            name: this.name,
            email: this.email,
            password: this.password,
            repassword: this.confirmPassword,
            title: this.jabatan.value,
            divisi: this.divisi.value,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (status != 200)
          throw Error("Error while creating user please try again");
        //TODO: CLOSE DIALOG
        return this.$q.notify({ message: "User created" });
      } catch (err) {
        console.log(err);
        return this.$q.notify({ message: err.message });
      }
    },
    //END CREATE

    //START UPLOAD
    async sendExcel() {
      try {
        if (!this.fileTask) throw Error("Please send a valid excel");
        const { status, data } = await this.$axios.post(
          "/upload/store-user",
          { file: this.fileTask },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (status != 200) throw Error(data.message);
        //TODO: CLOSE DIALOG
        return this.$q.notify({ message: data.message });
      } catch (err) {
        console.log(err);
        return this.$q.notify({ message: err.message });
      }
    },
    //END UPLOAD
  },
});
</script>

<style></style>
