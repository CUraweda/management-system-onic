<template>
  <q-page style="overflow-y: scroll; height: 100%">
    <div class="q-pa-md">
      <div style="justify-content: space-between; display: flex">
        <q-btn
          color="cyan"
          no-caps
          dense
          label="Add User"
          @click="adduser = true"
          icon="add"
          class="q-px-sm q-my-md"
        />

        <q-btn
          color="cyan"
          icon-right="upgrade"
          text-color="cyan"
          dense
          class="q-px-sm q-my-md"
          outline
          label="Import Task"
          no-caps
          @click="uploadTask = true"
        />
        <q-dialog v-model="uploadTask">
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
                outlined
                dense
                text-color="black"
                style="min-width: 300px"
                class="q-px-sm q-my-md"
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
        class="no-shadow my-sticky-dynamic"
        flat
        bordered
        :data="rows"
        row-key="name"
        :rows-per-page-options="[0]"
        :columns="columns"
        hide-bottom
      >
        <template>
          <q-tr class="table-head">
            <q-th style="padding-top: 0px; padding-bottom: 0px">
              <template v-slot:header="props">
                <q-tr class="table-head" :props="props">
                  <q-th
                    v-for="(col, i) in props.cols"
                    :key="i"
                    style="padding-top: 0px; padding-bottom: 0px"
                  >
                    {{ col }}
                  </q-th>
                </q-tr>
              </template>
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-for="(cell, key, i) in props.row" :key="i">
              <div>
                {{ cell }}
              </div>
            </q-td>
            <q-td>
              <div class="row" style="gap: 5px; justify-content: center">
                <div>
                  <q-btn
                    flat
                    rounded
                    size="13px"
                    @click="setMethod(props.row)"
                    style="color: #008444"
                    icon="edit"
                  >
                  </q-btn>
                </div>
                <div>
                  <q-btn
                    flat
                    rounded
                    size="13px"
                    @click="deleteUser(props.row)"
                    style="color: #008444"
                    icon="delete"
                  >
                  </q-btn>
                </div>
              </div>
            </q-td>
          </q-tr>
        </template>
        <!-- <template v-slot:top>
          <q-pagination
            v-model="pagination.page"
            :max="maxPages"
            @input="getData"
          ></q-pagination>
        </template> -->
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
import { defineComponent, ref } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      fileTask: ref(),
      token: ref(localStorage.getItem("token")),
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
      { name: "No", label: "No", align: "left", field: "id" },
      { name: "Name", label: "Name", align: "left", field: "Name" },
      { name: "Divisi", label: "Divisi", align: "left", field: "Divisi" },
      { name: "Jabatan", label: "Jabatan", align: "left", field: "Jabatan" },
      { name: "Email", label: "Email", align: "left", field: "Email" },
      { name: "", label: "Action", align: "center", field: "" },
    ];

    return {
      edituser: ref(false),
      uploadTask: ref(false),
      adduser: ref(false),
      columns,
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
    ["dialogName"]: {
      handler(value) {
        if (!value) this.clearInput();
      },
    },
    uploadTask: {
      handler(value) {
        if (!value) this.fileTask = null;
      },
    },
  },
  methods: {
    setMethod(data) {
      this.edituser = true;
      this.cache = data;
      console.log(this.cache);
      this.setEditUser(data.id);
      this.currentShownId = data.id;
    },
    //Button Setter
    setButton(rowData, act) {
      this.currentShownId = rowData.id;
      act != "edit" ? "" : "";
    },
    //Input nuller
    clearInput() {
      this.inputName = null;
      this.inputEmail = null;
      this.password = null;
      this.confirmpassword = null;
      this.selectDivisi = null;
      this.selectJabatan = null;
      this.selectGender = null;
    },

    async getData() {
      try {
        const response = await this.$axios.get(`/user/all`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        // console.log(response.data);
        if (response.status == 200) {
          const data = response.data;
          console.log(data);
          this.rows = data.map((list) => ({
            id: list.u_id,
            Name: list.u_name,
            Divisi: list.division,
            Jabatan: list.title,
            Email: list.u_email,
          }));
          console.log(this.rows);
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    //EDIT START
    async setEditUser(data) {
      const id = data;
      try {
        const { data, status } = await this.$axios.get(
          `/user/get-by-id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (status != 200) {
          throw Error("Error while fetching data please try again");
          this.edituser = false;
        }
        this.inputName = data.u_name;
        this.inputEmail = data.u_email;
        this.selectDivisi = data.division;
        this.selectJabatan = data.title;
        this.selectGender = data.u_gender;
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
            u_name: this.inputName,
            u_email: this.inputEmail,
            division: this.selectDivisi || "",
            title: this.selectJabatan || "",
            u_gender: this.selectGender || "",
          }
        );
        if (status != 200) throw Error(data.message);
        this.edituser = false;
        return this.$q.notify({ message: data.message });
      } catch (err) {
        console.log(err);
        return this.$q.notify({ message: err.message });
      }
    },
    //EDIT END

    //DELETE START
    async deleteUser(data) {
      const id = data.id;
      try {
        const { status, data } = await this.$axios.delete(
          `/user/delete-user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.getData();
        if (status !== 200) throw Error(data.message);
        return this.$q.notify({ message: data.message });
      } catch (err) {
        console.log(err);
        return this.$q.notify({ message: err.message });
      }
    },
    //DELETE END

    //CREATE START
    async createUser() {
      if (
        !this.inputName ||
        !this.inputEmail ||
        !this.password ||
        !this.confirmpassword ||
        !this.selectDivisi ||
        !this.selectJabatan ||
        !this.selectGender
      ) {
        return this.$q.notify({ message: "All fields are required" });
      }

      // Validasi konfirmasi password
      if (this.password !== this.confirmpassword) {
        return this.$q.notify({ message: "Passwords do not match" });
      } else {
        try {
          const { status, data } = await this.$axios.post("/user/register", {
            name: this.inputName,
            email: this.inputEmail,
            password: this.password,
            repassword: this.confirmpassword,
            divisi: this.selectDivisi,
            title: this.selectJabatan,
            gender: this.selectGender,
          });
          if (status === 200) {
            this.adduser = false;
            this.getData();
            return this.$q.notify({ message: "User created" });
          } else {
            throw new Error("Error while creating user, please try again");
          }
        } catch (err) {
          console.error(err);
          return this.$q.notify({ message: err.message });
        }
      }
    },
    //END CREATE

    //START UPLOAD
    async sendExcel() {
      try {
        if (!this["excelInputName"]) throw Error("Please send a valid excel");
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
        this.uploadTask = false;
        this.getData();
        return this.$q.notify({ message: data.message });
      } catch (err) {
        console.log(err);
        return this.$q.notify({ message: err.message });
      }
    },
    //END UPLOAD
    async postAddUser(data) {
      console.log(data);
      try {
        const response = await this.$axios.post(
          `/user/all`,
          {
            // data to be sent in the request body, if any
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        if (response.status == 200) {
          const data = response.data;
          this.rows = data.map((list) => ({
            Name: list.u_name,
            Divisi: list.division,
            Jabatan: list.title,
            Email: list.u_email,
          }));
          console.log(this.rows);
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
});
</script>

<style></style>
