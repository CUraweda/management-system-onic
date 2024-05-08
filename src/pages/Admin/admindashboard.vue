<template>
  <q-layout view="lHh Lpr lff">
    <div class="q-pa-md">
      <div class="flex items-center q-gutter-sm q-pb-md">
        <!-- <q-btn
          label="Add New User"
          @click="openDialogUser()"
          color="cyan"
          no-caps
        />
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
        /> -->
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
              <div class="text-h6">{{ roleAddUser }}</div>
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
                  v-model="company_name"
                  :options="optionscompany_name"
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
              <!-- <div class="full-width"> -->
              <!-- <q-input
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
                  v-model="company_name"
                  :options="optionscompany_name"
                  label="Cabang"
                  class="col-grow"
                /> -->
              <!-- </div> -->
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialogUser">
          <q-card style="width: 700px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">{{ roleAddUser }}</div>
              <q-space />
              <q-btn no-caps color="cyan" @click="handleAction()">{{ addUser }}</q-btn>
            </q-card-section>

            <q-card-section style="" class="">
              <!-- <h2>List Cabang</h2> -->

              <q-select
                outlined
                dense
                v-model="role"
                :options="optionsRole"
                label="Role"
                class="q-px-md"
              />
              <div class="full-width">
                <div style="display: flex; gap: 10px">
                  <v-row>
                    <v-col
                      v-for="company_nameList in company_nameList"
                      :key="company_nameList.id"
                    >
                      <div class="company_name-item">
                        <span>{{ company_nameList.b_name }}</span>
                        <span>{{ company_nameList.id }}</span>
                        <v-switch
                          v-model="selectedcompany_nameIds"
                          :value="company_nameList.id"
                          @change="togglecompany_nameAccess"
                        />
                        <q-toggle />
                      </div>
                    </v-col>
                  </v-row>
                  <!-- <q-select
                    outlined
                    dense
                    v-model="company_name"
                    :options="optionscompany_name"
                    style="width: 70px"
                    label="Cabang"
                    class="col-grow"
                  /> -->
                </div>
                <!-- <q-input
                  dense
                  outlined
                  v-model="name"
                  label="Name"
                  class="col-grow text-bold q-mt-md"
                /> -->
                <!-- <q-input
                  dense
                  outlined
                  v-model="email"
                  label="Email"
                  class="col-grow text-bold q-mt-md"
                /> -->

                <!-- <q-input
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
                </q-input> -->
              </div>
              <div class="full-width">
                <!-- <q-select
                  outlined
                  dense
                  v-model="division"
                  :options="optionsDivisi"
                  label="Divisi"
                  class="col-grow"
                /> -->
                <div class="q-mt-md" style="display: flex"></div>
                <div class="q-mt-md" style="display: flex; gap: 10px">
                  <!-- <q-select
                    outlined
                    dense
                    v-model="position"
                    :options="optionsPosition"
                    style="width: 70px"
                    label="Jabatan"
                    class="col-grow"
                  /> -->
                </div>
                <!-- <q-input
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
                  </template> -->
                <!-- </q-input> -->
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <!-- <q-btn
          label="Import From Excel"
          @click="openDialogImport"
          color="cyan"
          no-caps
        /> -->
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
            <q-td key="Id" :props="props">
              <div>{{ props.row.id }}</div>
            </q-td>

            <q-td key="Name" :props="props">
              <div>{{ props.row.name }}</div>
            </q-td>

            <q-td key="gender" :props="props">
              <div>{{ props.row.gender }}</div>
            </q-td>

            <q-td key="Cabang" :props="props">
              <div>{{ props.row.company_name }}</div>
            </q-td>

            <q-td key="Divisi" :props="props">
              <div>{{ props.row.division }}</div>
            </q-td>

            <q-td key="Position" :props="props">
              <div>{{ props.row.position }}</div>
            </q-td>

            <q-td key="Role" :props="props">
              <div>{{ props.row.role }}</div>
            </q-td>

            <q-td key="Email" :props="props"> </q-td>

            <!-- <q-td key="Status" :props="props">
              <q-toggle
                v-model="props.row.deleted"
                :color="props.row.deleted ? 'negative' : 'positive'"
                @input="toggleDelete(props.row)"
              />
            </q-td> -->

            <q-td key="Action" :props="props" style="width: 10px">
              <div class="q-gutter-sm">
                <q-btn
                  dense
                  class="under-role q-px-sm text-green"
                  rounded
                  no-caps
                  unelevated
                  color="green-2"
                  label="Edit"
                  @click="setButton(props.row, 'edit')"
                />

                <!-- <q-btn
                  dense
                  class="under-role q-px-sm text-blue"
                  rounded
                  no-caps
                  unelevated
                  color="blue-2"
                  label="Reset Password"
                  @click="openDialogResetPassword(props.row, 'reset pass')"
                /> -->
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-dialog v-model="adduser" persistent>
      <q-card class="q-pa-md" style="min-width: 600px">
        <q-bar class="bg-white text-grey-9 rounded-borders q-pa-xs">
          <div class="cursor-pointer non-selectable q-px-md">Create New User</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup @click="clearInput()" />
        </q-bar>
        <q-form class="q-pa-md q-mx-auto">
          <div style="width: 100%; gap: 5px; display: block" class="row">
            <div style="width: 100%; gap: 5px; display: flex; padding: 5px" class="col">
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
            <div style="width: 100%; gap: 5px; display: flex; padding: 5px" class="col">
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
            <div style="width: 100%; gap: 5px; display: flex; padding: 5px" class="col">
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
          <q-btn icon="close" flat round dense v-close-popup @click="clearInput()" />
        </q-bar>
        <q-form class="q-pa-md q-mx-auto">
          <div style="width: 100%; gap: 5px; display: block" class="row">
            <div style="width: 100%; gap: 5px; display: flex; padding: 5px" class="col">
              <!-- <q-input
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
              /> -->
            </div>
            <div style="width: 100%; gap: 5px; display: flex; padding: 5px" class="col">
              <!-- <q-input
                type="email"
                v-model="inputEmail"
                dense
                outlined
                style="width: 50%"
                placeholder="Email"
              /> -->
              <div style="width: 100%; gap: 5px; display: flex" class="col">
                <!-- <q-select
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
                /> -->
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
  </q-layout>
</template>

<script>
import Cookies from "js-cookie";
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      Roles: [],
      divisionId: sessionStorage.getItem("division_id")
        ? sessionStorage.getItem("division_id")
        : Cookies.get("division_id"),
      company_nameId: sessionStorage.getItem("company_name_id")
        ? sessionStorage.getItem("company_name_id")
        : Cookies.get("company_name_id"),
      // role: sessionStorage.getItem("role")
      //   ? sessionStorage.getItem("role")
      //   : Cookies.get("role"),
      grid: false,
      selectedcompany_nameIds: [],
      division_id: null,
      company_name_id: null,
      newPosition: ref(null),
      newDivisi: ref(null),
      fileTask: ref(null),
      uploadExcel: ref(false),
      changePassword: ref(),
      addDivision: ref(),
      addPosition: ref(),
      addUser: ref(),
      roleAddUser: ref(),
      roleAddDivision: ref(),
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
      optionscompany_name: ref([]),
      optionsDivisi: ref([]),
      optionsPosition: ref([]),
      company_name: ref(),
      company_nameList: ref(),
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
        "HRD & GA",
        "Marketing",
      ]),
      JabatanOpt: ref(["admin", "supervisor", "direktur", "manager", "operator"]),
      selectGender: ref(),
      genderOpt: ref(["Laki - Laki", "Perempuan"]),
    };
  },
  setup() {
    const columns = [
      { name: "Id", label: "Id", align: "center", field: "id", sortable: true },
      { name: "Name", label: "Nama", align: "center", field: "name", sortable: true },
      {
        name: "gender",
        label: "Gender",
        align: "center",
        field: "gender",
        sortable: true,
      },
      {
        name: "Cabang",
        label: "Cabang",
        align: "center",
        field: "company_name",
        sortable: true,
      },
      {
        name: "Divisi",
        label: "Divisi",
        align: "center",
        field: "division",
        sortable: true,
      },
      {
        name: "Position",
        label: "Jabatan",
        align: "center",
        field: "position",
        sortable: true,
      },
      { name: "Role", label: "Role", align: "center", field: "role", sortable: true },
      { name: "Action", label: "Action", align: "center", field: "id", sortable: false },
    ];

    return {
      edituser: ref(false),
      uploadTask: ref(false),
      adduser: ref(false),
      columns,
    };
  },
  mounted() {
    // this.getPosition();
    // this.getDivision();
    // this.getcompany_nameList();
    this.getRole();
    this.getData();
  },
  watch: {
    company_name: {
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
    async toggleDelete(rowData) {
      try {
        if (rowData.deleted === false) {
          const { status, data } = await this.$axios.delete(
            `/user/activate-user/${rowData.id}`,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          );
          if (status === 200) {
            // Berhasil membalikkan nilai deleted
            rowData.deleted = !rowData.deleted; // Perubahan nilai deleted sesuai dengan respons server
            this.$q.notify({
              message: `${rowData.name} Account Activated`,
              color: "positive",
            });
            this.getData();
          } else {
            throw new Error(data.message);
          }
        } else {
          const { status, data } = await this.$axios.delete(
            `/user/delete-user/${rowData.id}`,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          );
          if (status === 200) {
            // Berhasil membalikkan nilai deleted
            rowData.deleted = !rowData.deleted; // Perubahan nilai deleted sesuai dengan respons server
            this.$q.notify({
              message: `${rowData.name} Account Deactivated`,
              color: "negative",
            });
            this.getData();
          } else {
            throw new Error(data.message);
          }
        }
      } catch (error) {
        console.error(error);
        this.$q.notify({ message: error.message, color: "negative" });
      }
    },

    async getPosition(company_name_id, position_id) {
      try {
        console.log("🚀 ~ getPosition ~ position_id:", position_id);
        const { status, data } = await this.$axios.get("/position", {
          headers: {
            Authorization: `Bearer ${this.token}`,
            company_name: this.company_nameId || undifined,
            role: this.role.toLowerCase(),
          },
          params: {
            company_name_id: this.company_name.value || undifined,
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

    async getDivision(company_name_id, division_id) {
      console.log("🚀 ~ getDivision ~ division_id-id-id:", division_id);
      const { status, data } = await this.$axios.get("/divisi", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          company_name: this.company_nameId,
          role: this.role.toLowerCase(),
        },
        params: {
          company_name_id: this.company_name.value || undefined,
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

    async togglecompany_nameAccess() {
      console.log("Selected company_name IDs:", this.selectedcompany_nameIds);
    },

    async getcompany_nameList() {
      const { status, data } = await this.$axios.get("/company_name", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (status !== 200) {
        throw Error("Error while fetching");
      }

      console.log("company_name DATA:", data.data);

      this.company_nameList = data.data;
      console.log(
        "🚀 ~ getcompany_nameList ~ this.company_nameList:",
        this.company_nameList
      );
    },

    async getcompany_name(company_name_id, division_id) {
      const { status, data } = await this.$axios.get("/company_name", {
        headers: {
          Authorization: `Bearer ${this.token}`,
          company_name: this.company_nameId || undifined,
        },
      });

      if (status !== 200) {
        throw Error("Error while fetching");
      }

      console.log("DATA:", data.data);
      const listOfcompany_name = data.data.map((data) => ({
        label: data.b_name,
        value: data.id,
      }));

      this.optionscompany_name = listOfcompany_name;
      const selectedcompany_name = this.optionscompany_name.find(
        (company_name) => company_name.value === company_name_id
      );
      this.company_name = selectedcompany_name || this.optionscompany_name[0];
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
      this.getcompany_name();
      this.addDivision = "Add Division";
      this.roleAddUser = "Add Division";
      this.divisionAdd = true;
    },
    openDialogPosition() {
      this.position = null;
      this.dialogPosition = true;
      this.getcompany_name();
      this.addPosition = "Add Position";
      this.roleAddUser = "Add Position";
      this.positionAdd = true;
    },
    openDialogUser(edit = false) {
      this.role = this.optionsRole[0];
      this.getDivision();
      this.getcompany_name();
      this.getPosition();
      this.dialogUser = true;
      this.passwordIf = true;
      this.confirmPasswordIf = true;
      this.roleAddUser = edit ? "Edit User" : "Add User";
      this.addUser = edit ? "Edit User" : "Add User";
      this.editing = edit;
    },
    openDialogResetPassword(rowData) {
      // console.log("WEGOWEGO", rowData);
      this.changePassword = "Change Password";
      this.resetPasswordId = rowData.id;
      this.dialogPassword = true;
      thid = null;
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
        "role",
        "position",
        "division",
        "company_name",
        "confirmPassword",
      ];
      for (let index of listOfModel) {
        console.log(this[index]);
        this[index] = null;
      }
    },

    async getRole() {
      try {
        // console.log("bangbang")
        const response = await this.$axios.get(`/role`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.roles = response.data.data;
        console.log("🚀 ~ getRole ~ ole:", this.roles);

        return role;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    async getData() {
      try {
        console.log("bang");
        const Url = "https://office.onic.co.id/api/master/employee/active";
        const response = await fetch(Url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.getRole()
        const resData = await response.json();
        // console.log("🚀 ~ getData ~ response:", response)
        // console.log("🚀 ~ getData ~ resData:", resData)

        if (response.status === 200) {
          const data = resData.data;
          console.log("🚀 ~ getRole ~ ole:", this.roles);

          // Menyiapkan objek untuk mapping user.id ke roles
          const userRolesMap = {};

          this.getRole()
          // Mengisi userRolesMap dengan roles berdasarkan user.id
          this.roles.forEach((role) => {
            userRolesMap[role.u_id] = role; // Menyimpan role ke dalam userRolesMap berdasarkan user_id
          });

          this.rows = data.map((user, index) => ({
            id: user.id,
            name: user.name ? user.name : "",
            gender: user.gender ? user.gender : "",
            company_name: user.company_name ? user.company_name : "",
            division: user.division ? user.division : "",
            role: user.id && userRolesMap[user.id] ? userRolesMap[user.id].role : "", // Mengambil name dari role jika role ditemukan
            position: user.position ? user.position : "",
            deleted: user.deleted,
          }));
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    //EDIT START
    async setEditUser() {
      console.log("🚀 ~ setEditUser ~ this.currentShownId:", this.currentShownId);
      try {
        const { data, status } = await this.$axios.get(
          `/role/get-by-id/${this.currentShownId}`,
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
        // this.passwordIf = false;
        // this.confirmPasswordIf = false;
        // this.name = data.name;
        this.role = data.data.role;
        console.log("🚀 ~ setEditUser ~ role:", this.role);
        // this.division_id = data.division_id;
        // this.company_name_id = data.company_name_id;
        // this.getcompany_name(this.company_name_id, this.division_id);
        // this.getDivision(null, this.division_id);
        // this.getPosition(null, this.position_id);
      } catch (err) {
        console.log(err);
        return this.$q.notify({ message: err.message });
      }
    },

    async sendEdit() {
      try {
        const { data, status } = await this.$axios.put(
          `/role/edit/${this.currentShownId}`,
          {
            role: this.role.value,
          }
        );
        if (status != 200) throw Error(data.message);
        console.log(this.role.value);
        this.dialogUser = false;
        this.getData();
        this.getRole();
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
            role: this.role.value,
            division_id: this.division.value,
            company_name_id: this.company_name.value,
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
            company_name_id: this.company_name.value,
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
            company_name_id: this.company_name.value,
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
        if (status != 200) {
          this.uploadExcel = false;
          throw new Error(data.message);
        }
        this.uploadExcel = false;
        this.getData();
        return this.$q.notify({ message: data.message });
      } catch (err) {
        console.log(err);
        this.uploadExcel = false;
        this.getData();
        return this.$q.notify({ message: err.message });
      }
    },
    //END UPLOAD

    //START REPAS
    async resetPassword() {
      try {
        console.log("ID: ", this.resetPasswordId);
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
          this.uploadExcel = false;
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
