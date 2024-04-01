<template>
  <q-layout view="lHh Lpr lff">
    <div class="q-pa-md">
      <div class="flex items-center q-gutter-sm q-pb-md">
        <q-btn label="Add New User" @click="openDialogUser()" color="cyan" no-caps />
        <q-btn
          label="Add New Division"
          @click="openDialogDivision()"
          color="cyan"
          no-caps
        />
        <q-btn
          label="Add New Position"
          @click="openDialogPosition()"
          color="cyan"
          no-caps
        />
        <q-dialog v-model="dialogPassword">
          <q-card style="width: 700px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Change Password</div>
              <q-space />
              <q-btn no-caps color="cyan" @click="resetPassword()">Change Password</q-btn>
            </q-card-section>

            <q-card-section
              style="display: flex; gap: 10px; width: 100%"
              class="col-grow"
            >
              <div class="full-width">
                <q-input
                  v-model="newPassword"
                  dense
                  outlined
                  label="New Password"
                  class="q-mt-md"
                  :rules="[(val) => (val !== null && val !== '') || 'Required']"
                >
                </q-input>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialogDivision">
          <q-card style="width: 700px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">{{ titleAddUser }}</div>
              <q-space />
              <q-btn no-caps color="cyan" @click="createDivision()">{{
                addDivision
              }}</q-btn>
            </q-card-section>

            <q-card-section
              style="display: flex; gap: 10px; width: 100%"
              class="col-grow"
            >
              <div class="full-width">
                <q-input
                  v-model="newDivisi"
                  dense
                  outlined
                  label="Divisi Baru"
                  class="q-mt-md"
                  :rules="[(val) => (val !== null && val !== '') || 'Required']"
                >
                </q-input>

                <q-select
                  outlined
                  dense
                  v-model="branch"
                  :options="optionsBranch"
                  label="Cabang"
                  class="col-grow"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialogPosition">
          <q-card style="width: 700px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Add Position</div>
              <q-space />
              <q-btn no-caps color="cyan" @click="createPosition()">{{
                addPosition
              }}</q-btn>
            </q-card-section>

            <q-card-section
              style="display: flex; gap: 10px; width: 100%"
              class="col-grow"
            >
              <div class="full-width">
                <q-input
                  v-model="newPosition"
                  dense
                  outlined
                  label="Jabatan Baru"
                  class="q-mt-md"
                  :rules="[(val) => (val !== null && val !== '') || 'Required']"
                >
                </q-input>

                <q-select
                  outlined
                  dense
                  v-model="branch"
                  :options="optionsBranch"
                  label="Cabang"
                  class="col-grow"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialogUser">
          <q-card style="width: 700px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">{{ titleAddUser }}</div>
              <q-space />
              <q-btn no-caps color="cyan" @click="handleAction()">{{ addUser }}</q-btn>
            </q-card-section>

            <q-card-section
              style="display: flex; gap: 10px; width: 100%"
              class="col-grow"
            >
              <div class="full-width">
                <div style="display: flex; gap: 10px">
                  <q-select
                    outlined
                    dense
                    v-model="branch"
                    :options="optionsBranch"
                    style="width: 70px"
                    label="Cabang"
                    class="col-grow"
                  />
                </div>
                <q-input
                  dense
                  outlined
                  v-model="name"
                  label="Name"
                  class="col-grow text-bold q-mt-md"
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
                  v-model="division"
                  :options="optionsDivisi"
                  label="Divisi"
                  class="col-grow"
                />
                <div class="q-mt-md" style="display: flex; gap: 10px">
                  <q-select
                    outlined
                    dense
                    v-model="role"
                    :options="optionsRole"
                    style="width: 70px"
                    label="Role"
                    class="col-grow"
                  />
                </div>
                <div class="q-mt-md" style="display: flex; gap: 10px">
                  <q-select
                    outlined
                    dense
                    v-model="position"
                    :options="optionsPosition"
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
        <q-btn label="Import From Excel" @click="openDialogImport" color="cyan" no-caps />
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
            <q-td key="Id" :props="props">
              <div>{{ props.row.u_id }}</div>
            </q-td>
            <q-td key="Name" :props="props">
              <div>{{ props.row.u_name }}</div>
            </q-td>

            <q-td key="Cabang" :props="props">
              <div>{{ props.row.branch }}</div>
            </q-td>

            <q-td key="Divisi" :props="props">
              <div>{{ props.row.division }}</div>
            </q-td>

            <q-td key="Position" :props="props">
              <div>{{ props.row.position }}</div>
            </q-td>

            <q-td key="Role" :props="props">
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
                <q-btn
                  dense
                  class="under-title q-px-sm text-blue"
                  rounded
                  no-caps
                  unelevated
                  color="blue-2"
                  label="Reset Password"
                  @click="openDialogResetPassword(props.row, 'reset pass')"
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
import Cookies from "js-cookie";
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      divisionId: sessionStorage.getItem("division_id")
        ? sessionStorage.getItem("division_id")
        : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")
        ? sessionStorage.getItem("branch_id")
        : Cookies.get("branch_id"),
      title: sessionStorage.getItem("title")
        ? sessionStorage.getItem("title")
        : Cookies.get("title"),
      grid: false,
      division_id: null,
      branch_id: null,
      newPosition: ref(null),
      newDivisi: ref(null),
      fileTask: ref(null),
      uploadExcel: ref(false),
      changePassword: ref(),
      addDivision: ref(),
      addPosition: ref(),
      addUser: ref(),
      titleAddUser: ref(),
      titleAddDivision: ref(),
      passwordIf: ref(true),
      confirmPasswordIf: ref(true),
      dialogPassword: ref(false),
      dialogPosition: ref(false),
      resetPasswordId: ref(null),
      newPassword: ref(""),
      token: ref(
        sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : Cookies.get("token")
      ),
      name: ref(),
      email: ref(),
      optionsBranch: ref([]),
      optionsDivisi: ref([]),
      optionsPosition: ref([]),
      branch: ref(),
      division: ref(),
      position: ref(),
      role: ref(),
      optionsRole: [
        { label: "Admin", value: "admin" },
        { label: "Direktur", value: "director" },
        { label: "Manager", value: "manager" },
        { label: "Supervisor", value: "supervisor" },
        { label: "Operator", value: "operator" },
      ],
      isPwd: true,
      isConfirmPwd: true,
      password: ref(),
      divisionAdd: false,
      positionAdd: false,
      PasswordChange: false,
      editing: false,
      confirmPassword: ref(),
      dialogDivision: ref(false),
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
      { name: "Id", label: "Id", align: "center", field: "u_id" },
      { name: "Name", label: "Nama", align: "center", field: "u_name" },
      { name: "Cabang", label: "Cabang", align: "center", field: "branch" },
      { name: "Divisi", label: "Divisi", align: "center", field: "division" },
      { name: "Position", label: "Jabatan", align: "center", field: "position" },
      { name: "Role", label: "Role", align: "center", field: "title" },
      { name: "Email", label: "Email", align: "center", field: "u_email" },
      { name: "Action", label: "Action", align: "center", field: "id" },
    ];
    return {
      columns,
    };
  },
  mounted() {
    // this.getPosition();
    // this.getDivision();
    // this.getBranch();
    this.getData();
  },
  watch: {
    branch: {
      handler(value) {
        if (value) {
          this.getDivision(value.value, this.division_id);
          this.getPosition(value.value, this.position_id);
        }
      },
    },
    dialogDivision: {
      handler(value) {
        if (value != true) this.clearInput();
      },
    },
    dialogUser: {
      handler(value) {
        // console.log(value);
        if (value != true) this.clearInput();
      },
    },
  },

  methods: {
    async getPosition(branch_id, position_id) {
      try {
        console.log("🚀 ~ getPosition ~ position_id:", position_id);
        const { status, data } = await this.$axios.get("/position", {
          headers: {
            Authorization: `Bearer ${this.token}`,
            branch: this.branchId,
            title: this.title,
          },
          params: {
            branch_id: this.branch.value,
          },
        });

        if (status !== 200) {
          throw Error("Error while fetching positions");
        }

        console.log("DATA:", data);
        const listOfPosition = data.data.map((data) => ({
          label: data.p_name,
          value: data.id,
        }));

        this.optionsPosition = listOfPosition;
        const selectedPosition = this.optionsPosition.find(
          (position) => position.value === position_id
        );
        this.position = selectedPosition || this.optionsPosition[0];
      } catch (error) {
        console.error("Error in getPosition:", error);
        // Handle error appropriately, maybe set a default position or display an error message
      }
    },
    async getDivision(branch_id, division_id) {
      console.log("🚀 ~ getDivision ~ division_id-id-id:", division_id);
      const { status, data } = await this.$axios.get("/divisi", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          branch: this.branchId,
          title: this.title,
        },
        params: {
          branch_id: this.branch.value,
        },
      });

      if (status !== 200) {
        throw Error("Error while fetching");
      }

      console.log("DATA:", data.data);
      const listOfDivisi = data.data.map((data) => ({
        label: data.d_name,
        value: data.id,
      }));

      this.optionsDivisi = listOfDivisi;
      const selectedDivisi = this.optionsDivisi.find(
        (divisi) => divisi.value === division_id
      );
      this.division = selectedDivisi || this.optionsDivisi[0];
    },

    async getBranch(branch_id, division_id) {
      const { status, data } = await this.$axios.get("/branch", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          branch: this.branchId,
        },
      });

      if (status !== 200) {
        throw Error("Error while fetching");
      }

      console.log("DATA:", data.data);
      const listOfBranch = data.data.map((data) => ({
        label: data.b_name,
        value: data.id,
      }));

      this.optionsBranch = listOfBranch;
      const selectedBranch = this.optionsBranch.find(
        (branch) => branch.value === branch_id
      );
      this.branch = selectedBranch || this.optionsBranch[0];
    },

    togglePwdVisibility() {
      this.isPwd = !this.isPwd;
    },
    toggleConfirmPwdVisibility() {
      this.isConfirmPwd = !this.isConfirmPwd;
    },
    openDialogImport() {
      this.uploadExcel = true;
    },
    openDialogDivision() {
      this.division = null;
      this.dialogDivision = true;
      this.getBranch();
      this.addDivision = "Add Division";
      this.titleAddUser = "Add Division";
      this.divisionAdd = true;
    },
    openDialogPosition() {
      this.position = null;
      this.dialogPosition = true;
      this.getBranch();
      this.addPosition = "Add Position";
      this.titleAddUser = "Add Position";
      this.positionAdd = true;
    },
    openDialogUser(edit = false) {
      this.role = this.optionsRole[0];
      this.getDivision();
      this.getBranch();
      this.getPosition();
      this.dialogUser = true;
      this.passwordIf = true;
      this.confirmPasswordIf = true;
      this.titleAddUser = edit ? "Edit User" : "Add User";
      this.addUser = edit ? "Edit User" : "Add User";
      this.editing = edit;
    },
    openDialogResetPassword(rowData) {
      this.changePassword = "Change Password";
      this.resetPasswordId = rowData.id;
      this.dialogPassword = true;
      this.getDivision();
      this.getBranch();
      this.newPassword = null;
      this.PasswordChange = true;
    },
    //Button Setter
    setButton(rowData, act) {
      this.currentShownId = rowData.u_id;
      console.log(this.currentShownId);
      act != "edit" ? "" : this.setEditUser();
      act != "delete" ? "" : this.deleteUser();
      act != "reset pass" ? "" : this.openDialogResetPassword();
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
        "newDivisi",
        "PasswordChange",
        "newPassword",
        "role",
        "position",
        "division",
        "branch",
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
            branch: this.branchId,
            division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.status === 200) {
          const { data } = response;
          this.rows = data.map((user) => ({
            u_id: user.u_id,
            u_name: user.u_name ? user.u_name : "",
            branch: user.branch ? user.branch : "",
            division: user.division ? user.division : "",
            title: user.title ? user.title : "",
            u_email: user.u_email ? user.u_email : "",
            position: user.position ? user.position : "",
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
        console.log("🚀 ~ setEditUser ~ data:", data);
        this.openDialogUser(true);
        this.passwordIf = false;
        this.confirmPasswordIf = false;
        this.name = data.u_name;
        this.email = data.u_email;
        this.role = data.title;
        this.division_id = data.division_id;
        this.branch_id = data.branch_id;
        this.getBranch(this.branch_id, this.division_id);
        this.getDivision(null, this.division_id);
        this.getPosition(null, this.position_id);
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
            division_id: this.division.value,
            branch_id: this.branch.value,
            position_id: this.position.value,
            title: this.role.value,
          }
        );
        if (status != 200) throw Error(data.message);
        console.log(this.role.value);
        this.dialogUser = false;
        this.getData();
        return this.$q.notify({ message: data.message });
      } catch (err) {
        console.log(err);
        return this.$q.notify({ message: err.message });
      }
    },

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
            title: this.role.value,
            division_id: this.division.value,
            branch_id: this.branch.value,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (status != 200) throw Error("Error while creating user please try again");
        //TODO: CLOSE DIALOG
        this.dialogUser = false;
        this.getData();
        return this.$q.notify({ message: "User created" });
      } catch (err) {
        console.log(err);
        return this.$q.notify({ message: err.message });
      }
    },

    //END CREATE
    async createPosition() {
      try {
        const { status, data } = await this.$axios.post(
          "/position/create",
          {
            p_name: this.newPosition,
            branch_id: this.branch.value,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (status != 200) throw Error("Error while creating Position please try again");
        //TODO: CLOSE DIALOG
        this.dialogPosition = false;
        this.getPosition();
        return this.$q.notify({ message: "Position created" });
      } catch (err) {
        console.log(err);
        return this.$q.notify({ message: err.message });
      }
    },
    async createDivision() {
      try {
        const { status, data } = await this.$axios.post(
          "/divisi/create",
          {
            d_name: this.newDivisi,
            branch_id: this.branch.value,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (status != 200) throw Error("Error while creating Division please try again");
        //TODO: CLOSE DIALOG
        this.dialogDivision = false;
        this.getDivision();
        return this.$q.notify({ message: "Division created" });
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

    //START REPAS
    async resetPassword() {
      try {
        const { status, data } = await this.$axios.put(
          `/user/update-password/${this.resetPasswordId}`,
          { newPassword: this.newPassword },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (status === 200) {
          // Reset berhasil
          this.dialogPassword = false;
          this.$q.notify({ message: data.message, color: "positive" });
        } else {
          // Reset gagal
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
        this.$q.notify({ message: error.message, color: "negative" });
      }
    },
    //END REPASS
  },
});
</script>

<style></style>
