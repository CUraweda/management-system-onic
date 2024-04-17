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
        row-key="name"
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

            <q-td key="Cabang" :props="props">
              <div>{{ props.row.branch }}</div>
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
    <q-dialog v-model="adduser" persistent>
      <q-card class="q-pa-md" style="min-width: 600px">
        <q-bar class="bg-white text-grey-9 rounded-borders q-pa-xs">
          <div class="cursor-pointer non-selectable q-px-md">
            Create New User
          </div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            @click="clearInput()"
          />
        </q-bar>
        <q-form class="q-pa-md q-mx-auto">
          <div style="width: 100%; gap: 5px; display: block" class="row">
            <div
              style="width: 100%; gap: 5px; display: flex; padding: 5px"
              class="col"
            >
              <q-input
                type="text"
                v-model="inputName"
                dense
                outlined
                style="width: 50%"
                placeholder="Name"
              />

              <q-select
                outlined
                v-model="selectDivisi"
                :options="DivisiOpt"
                dense
                style="width: 50%"
                :label="'Divisi'"
                dropdown-icon="expand_more"
              />
            </div>
            <div
              style="width: 100%; gap: 5px; display: flex; padding: 5px"
              class="col"
            >
              <q-input
                type="email"
                v-model="inputEmail"
                dense
                outlined
                style="width: 50%"
                placeholder="Email"
              />
              <div style="width: 100%; gap: 5px; display: flex" class="col">
                <q-select
                  outlined
                  v-model="selectJabatan"
                  :options="JabatanOpt"
                  dense
                  style="width: 100%"
                  :label="'Jabatan'"
                  dropdown-icon="expand_more"
                />
                <q-select
                  outlined
                  v-model="selectGender"
                  :options="genderOpt"
                  dense
                  style="width: 100%"
                  :label="'Gender'"
                  dropdown-icon="expand_more"
                />
              </div>
            </div>
            <div
              style="width: 100%; gap: 5px; display: flex; padding: 5px"
              class="col"
            >
              <q-input
                v-model="password"
                label="password"
                dense
                style="width: 50%"
                outlined
                type="password"
              />
              <q-input
                v-model="confirmpassword"
                label="Confirm Password"
                dense
                style="width: 50%"
                outlined
                type="password"
              />
            </div>
          </div>
          <q-card-section class="row items-center q-gutter-sm">
            <q-btn
              dense
              color="primary"
              @click="createUser()"
              no-caps
              style="border-radius: 8px"
              class="q-px-xl"
              >Create</q-btn
            >
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="edituser" persistent>
      <q-card class="q-pa-md" style="min-width: 600px">
        <q-bar class="bg-white text-grey-9 rounded-borders q-pa-xs">
          <div class="cursor-pointer non-selectable q-px-md">Edit User</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
            @click="clearInput()"
          />
        </q-bar>
        <q-form class="q-pa-md q-mx-auto">
          <div style="width: 100%; gap: 5px; display: block" class="row">
            <div
              style="width: 100%; gap: 5px; display: flex; padding: 5px"
              class="col"
            >
              <q-input
                type="text"
                v-model="inputName"
                dense
                outlined
                style="width: 50%"
                placeholder="Name"
              />

              <q-select
                outlined
                v-model="selectDivisi"
                :options="DivisiOpt"
                dense
                style="width: 50%"
                :label="'Divisi'"
                dropdown-icon="expand_more"
              />
            </div>
            <div
              style="width: 100%; gap: 5px; display: flex; padding: 5px"
              class="col"
            >
              <q-input
                type="email"
                v-model="inputEmail"
                dense
                outlined
                style="width: 50%"
                placeholder="Email"
              />
              <div style="width: 100%; gap: 5px; display: flex" class="col">
                <q-select
                  outlined
                  v-model="selectJabatan"
                  :options="JabatanOpt"
                  dense
                  style="width: 100%"
                  :label="'Jabatan'"
                  dropdown-icon="expand_more"
                />
                <q-select
                  outlined
                  v-model="selectGender"
                  :options="genderOpt"
                  dense
                  style="width: 100%"
                  :label="'Gender'"
                  dropdown-icon="expand_more"
                />
              </div>
            </div>
          </div>
          <q-card-section class="row items-center q-gutter-sm">
            <q-btn
              dense
              color="primary"
              @click="sendEdit()"
              no-caps
              style="border-radius: 8px"
              class="q-px-xl"
              >Update</q-btn
            >
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
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
      division_id: null,
      branch_id: null,
      newDivisi: ref(null),
      fileTask: ref(null),
      uploadExcel: ref(false),
      changePassword: ref(),
      addDivision: ref(),
      addUser: ref(),
      titleAddUser: ref(),
      titleAddDivision: ref(),
      passwordIf: ref(true),
      confirmPasswordIf: ref(true),
      dialogPassword: ref(false),
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
      branch: ref(),
      division: ref(),
      jabatan: ref(),
      optionsJabatan: [
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
      inputName: ref(""),
      inputEmail: ref(""),
      selectDivisi: ref(""),
      selectJabatan: ref(""),
      password: ref(""),
      rows: ref([]),
      confirmpassword: ref(""),
      DivisiOpt: ref([
        "Oprasional Sales",
        "Acc & Purches",
        "Produksi",
        "HRD & GA",
        "Marketing",
      ]),
      JabatanOpt: ref([
        "admin",
        "supervisor",
        "direktur",
        "manager",
        "operator",
      ]),
      selectGender: ref(),
      genderOpt: ref(["Laki - Laki", "Perempuan"]),
    };
  },
  setup() {
    const columns = [
      { name: "Name", label: "Nama", align: "center", field: "u_name" },
      { name: "Divisi", label: "Divisi", align: "center", field: "division" },
      { name: "Cabang", label: "Cabang", align: "center", field: "branch" },
      { name: "Jabatan", label: "Jabatan", align: "center", field: "title" },
      { name: "Email", label: "Email", align: "center", field: "u_email" },
      { name: "Action", label: "Action", align: "center", field: "id" },
    ];

    return {
      edituser: ref(false),
      uploadTask: ref(false),
      adduser: ref(false),
      columns,
    };
  },
  mounted() {
    this.getDivision();
    this.getBranch();
    this.getData();
  },
  watch: {
    branch: {
      handler(value) {
        if (value) {
          this.getDivision(value.value, this.division_id);
        }
      },
    },
    dialogDivision: {
      handler(value) {
        // console.log(value);
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
    async getDivision(branch_id, division_id) {
      console.log("🚀 ~ getDivision ~ division_id-id-id:", division_id);
      const { status, data } = await this.$axios.get("/divisi", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          branch: this.branchId,
          title: this.title
        },
        params: {
          branch_id: this.branch.value,
        },
      });''

      if (status !== 200) {
        throw Error("Error while fetching");
      }

      console.log("🚀 ~ getDivision ~ this.branch.value:", this.branch.value)
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
      this.getDivision();
      this.getBranch();
      this.addDivision = "Add Division";
      this.titleAddUser = "Add Division";
      this.divisionAdd = true;
    },
    openDialogUser(edit = false) {
      this.jabatan = this.optionsJabatan[0];
      this.getDivision();
      this.getBranch();
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
      this.currentShownId = rowData.id;
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
        "jabatan",
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
            id: user.u_id,
            u_name: user.u_name ? user.u_name : "",
            branch: user.branch ? user.branch : "",
            division: user.division ? user.division : "",
            title: user.title ? user.title : "",
            u_email: user.u_email ? user.u_email : "",
          }));
        }
      } catch (err) {
        console.error(err);
        throw err;
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
        this.jabatan = data.title;
        this.division_id = data.division_id;
        this.branch_id = data.branch_id;
        this.getBranch(this.branch_id, this.division_id);
        this.getDivision(null, this.division_id);
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
            title: this.jabatan.value,
          }
        );
        if (status != 200) throw Error(data.message);
        console.log(this.jabatan.value);
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
            title: this.jabatan.value,
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
