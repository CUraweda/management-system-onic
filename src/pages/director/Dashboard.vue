<template>
  <q-page>
    <q-card-section class="row q-gutter-sm q-pt-md q-ml-sm items-center">
      <div class="text-h6 q-mt-xs q-ml-md">Feedback Review</div>
      <q-space></q-space>
      <q-select
        dense
        filled
        label="Cabang"
        v-model="branch"
        name="Cabang"
        use-input
        input-debounce="0"
        :options="filteredBranchOptions"
        @filter="filterBranch"
        behavior="menu"
        class="col-2"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        dense
        filled
        label="Division"
        v-model="divisi"
        name="Division"
        use-input
        input-debounce="0"
        :options="filteredDivisionOptions"
        @filter="filterDivision"
        behavior="menu"
        class="col-2"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        dense
        filled
        label="Person"
        v-model="person"
        name="Person"
        use-input
        input-debounce="0"
        :options="filteredPersonOptions"
        @filter="filterPerson"
        behavior="menu"
        class="col-2"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input
        filled
        label="From"
        dense
        v-model="formattedStartDate"
        mask="##/##/####"
        class=""
        style="width: 155px"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="popupProxy" cover transition-show="scale" transition-hide="scale">
              <q-date @input="updateStartDate" v-model="deposit.start" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <!-- <q-btn v-close-popup label="Close" color="primary" flat /> -->
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        filled
        label="To"
        dense
        v-model="formattedDueDate"
        mask="##/##/####"
        class=""
        style="width: 155px"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="duePopupProxy" cover transition-show="scale" transition-hide="scale">
              <q-date @input="updateDueDate"  v-model="deposit.due" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <!-- <q-btn v-close-popup label="Close" color="primary" flat /> -->
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-card-section>
    <Card></Card>
    <div>
      <div class="text-h6 q-pl-md q-ma-md">PERFORMANCE MONITORING</div>
      <dashboard-table></dashboard-table>
      <div class="row q-col-gutter-sm q-mt-xs">
        <apex-half-donut></apex-half-donut>
        <apex-column-charts-basic></apex-column-charts-basic>
      </div>
    </div>
  </q-page>
</template>

<script>
import { eventBus } from "../../event-bus.js";
import Cookies from "js-cookie";
import Vue from "vue";
import CardBase from "components/CardBase";
import { ref } from "vue";
import axios from "axios";
import {date} from 'quasar';

export default {
  name: "DashboardDirector",
  components: {
    Card: () => import("components/Card"),
    ApexHalfDonut: () => import("components/ApexHalfDonut"),
    ApexColumnChartsBasic: () => import("components/ApexColumnChartsBasic"),
    DashboardTable: () => import("components/DashboardTable"),
  },
  data() {
    return {
      loading: ref(true),
      formattedDueDate:'',
      formattedStartDate:'',
      Id: sessionStorage.getItem("id") ? sessionStorage.getItem("id") : Cookies.get("id"),
      email: sessionStorage.getItem("email")
        ? sessionStorage.getItem("email")
        : Cookies.get("email"),
      password: sessionStorage.getItem("password")
        ? sessionStorage.getItem("password")
        : Cookies.get("password"),
      username: sessionStorage.getItem("username")
        ? sessionStorage.getItem("username")
        : Cookies.get("username"),
      title: sessionStorage.getItem("title")
        ? sessionStorage.getItem("title")
        : Cookies.get("title"),
      divisionId: sessionStorage.getItem("division_id")
        ? sessionStorage.getItem("division_id")
        : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")
        ? sessionStorage.getItem("branch_id")
        : Cookies.get("branch_id"),
      personId: sessionStorage.getItem("person_id")
        ? sessionStorage.getItem("person_id")
        : Cookies.get("person_id"),
      TotalOpen: "0",
      TotalInProgress: "0",
      TotalOverdue: "0",
      TotalCompleted: "0",
      TotalTotal: "0",
      filter: "",
      mode: "list",
      search: "",
      deposit: {
        start: "",
        due: "",
      },
      roles: [],
      filteredPersonOptions: [],
      filteredDivisionOptions: [],
      filteredBranchOptions: [],
      // branches: [],
      branch: {},
      divisi: {},
      person: {},
    };
  },

  setup() {
    return {
      // role: ref(),
      personOptions: [],
      divisiOptions: [],
      branchOptions: [],
      divisi1: [],
      token: ref(
        sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : Cookies.get("token")
      ),
      onItemClick() {},
    };
  },

  watch: {
    "deposit.start": {
      handler(value) {
        this.deposit.start = value != "" ? value : "";
        eventBus.$emit("start-date-selected", this.deposit.start);
      },
      // deep: true,
    },

    "deposit.due": {
      handler(value) {
        this.deposit.due = value != "" ? value : "";
        // this.fetchDataTable();
        eventBus.$emit("due-date-selected", this.deposit.due);
      },
    },

    divisi: {
      handler(value) {
        // console.log("WAKWAW");
        // console.log("UWAW: ", value.label);
        sessionStorage.setItem("division", this.divisi.label);
        sessionStorage.setItem("division_id", this.divisi.value);
        this.fetchPersonData();
      },
    },

    person: {
      handler(value) {
        // this.filterPerson();
        sessionStorage.setItem("person_id", this.person.value);
        eventBus.$emit("person-selected", this.person);
        eventBus.$emit("start-date-selected", this.deposit.start);
        eventBus.$emit("due-date-selected", this.deposit.due);
        // console.log("🚀 ~ handler ~ this.person.value:", this.person.value);
      },
    },

    branch: {
      handler(value) {
        // console.log("UWEY");
        // console.log("OOOOP: ", value.label);
        // this.fetchDivisionData();
        this.changeCompany();
        this.fetchPersonData();
      },
    },
  },

  mounted() {
    const { start, end } = this.getStartAndEndOfWeek();
    this.deposit.start = this.formatDate(start);
    this.deposit.due = this.formatDate(end);
    this.updateStartDate(this.deposit.start)
    this.updateDueDate(this.deposit.due)
    // this.formattedStartDate = this.formatDate(start);
    // this.formattedDueDate = this.formatDate(end);
    this.getRole();
    this.fetchBranchData();
    this.fetchDivisionData();
    this.checker();
    // this.fetchPersonData();
    // this.fetchDataTable();
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

    methods: {
    updateStartDate (val) {
      if (val) {
        // console.log("🚀 ~ updateStartDate ~ val:", val)
        const [year, month, day] = val.split('-')
        this.formattedStartDate = `${day}/${month}/${year}`
      }
      this.$refs.popupProxy.hide()
    },

    updateDueDate (val) {
      if (val) {
        const [year, month, day] = val.split('-')
        this.formattedDueDate = `${day}/${month}/${year}`
      }
      this.$refs.duePopupProxy.hide()
    },

    getStartAndEndOfWeek() {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
      const startOfYear = new Date(today.getFullYear(), 0, 1); // 1st January of current year
      const startOfWeek = new Date(today);
      const endOfWeek = new Date(today);

      // Set startOfWeek to the previous Monday
      const diffToMonday = (dayOfWeek + 6) % 7;
      startOfWeek.setDate(today.getDate() - diffToMonday);
      startOfWeek.setHours(0, 0, 0, 0); // Set to 00:00

      // Set endOfWeek to the next Sunday
      const diffToSunday = (7 - dayOfWeek) % 7;
      endOfWeek.setDate(today.getDate() + diffToSunday);
      endOfWeek.setHours(23, 59, 59, 999); // Set to 23:59:59.999 for end of day

      return {
        start: startOfYear,
        end: endOfWeek
      };
    },

    formatDate(dateObj) {
      return date.formatDate(dateObj, 'YYYY-MM-DD');
    },

    filterBranch(val, update, abort) {
      // console.log("🚀 ~ filterBranch ~ val:", val)
      // console.log("🚀 ~ update ~ this.branchOptions:", this.branchOptions)
      if (val === '') {
        // this.fetchBranchData()
        update(() => {
          this.filteredBranchOptions = this.branchOptions
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filteredBranchOptions = this.branchOptions.filter(option => {
          return option.label.toLowerCase().includes(needle)
        })
      })
        // console.log("🚀 ~ update ~ this.filteredBranchOptions:", this.filteredPersonOptions)
    },

    filterDivision(val, update, abort) {
      // console.log("🚀 ~ filterDivision ~ val:", val)
      // console.log("🚀 ~ update ~ this.divisiOptions:", this.divisiOptions)
      if (val === '') {
        // this.fetchDivisionData()
        update(() => {
          this.filteredDivisionOptions = this.divisiOptions
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filteredDivisionOptions = this.divisiOptions.filter(option => {
          return option.label.toLowerCase().includes(needle)
        })
      })
        // console.log("🚀 ~ update ~ this.filteredDivisionOptions:", this.filteredPersonOptions)
    },

    filterPerson(val, update, abort) {
      // console.log("🚀 ~ filterPerson ~ val:", val)
      // console.log("🚀 ~ update ~ this.personOptions:", this.personOptions)
      if (val === '') {
        // this.fetchPersonData()
        update(() => {
          this.filteredPersonOptions = this.personOptions
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filteredPersonOptions = this.personOptions.filter(option => {
          return option.label.toLowerCase().includes(needle)
        })
      })
        // console.log("🚀 ~ update ~ this.filteredPersonOptions:", this.filteredPersonOptions)
    },

    async checker() {
      try {
        const response = await this.$axios.get("/task/checker");
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async changeCompany() {
      const data = {
        u_email: this.email,
        u_password: this.password,
        uc_company_id: this.branch.value,
      };

      const loginUrl = "https://office.onic.co.id/api/auth/login";

      try {
        const response = await axios.post(loginUrl, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (response.status !== 200) {
          console.log("err");
        }

        const ResDat = await response.data;
        const ResponseData = await ResDat.data.data;
        const AucData = await ResponseData.active_user_company;
        const DivisionData = await AucData.division;
        const BranchData = await AucData.company;
        const PositionData = await AucData.position;

        const division = DivisionData.d_name;
        const branch = BranchData.c_name;
        const position = PositionData.p_name;
        const position_id = PositionData.p_id;
        const division_id = DivisionData.d_id;
        const branch_id = BranchData.c_id;

        const dataData = {
          division,
          branch,
          position,
          position_id,
          division_id,
          branch_id,
        };

        // console.log("🚀 ~ changeCompany ~ dataData:", dataData);

        sessionStorage.setItem("division", division);
        sessionStorage.setItem("branch", branch);
        sessionStorage.setItem("position", position);
        sessionStorage.setItem("position_id", position_id);
        sessionStorage.setItem("division_id", division_id);
        sessionStorage.setItem("branch_id", branch_id);

        // console.log("Diganti ", response);
      } catch (error) {
        console.error("Error fetching users:", error);
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
        // console.log("🚀 ~ getRole ~ ole:", this.roles);

        // return role;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    async fetchDivisionData() {
      const loginUrl = "https://office.onic.co.id/api/master/division";

      // Make the POST request using fetch
      try {
        const response = await axios.get(loginUrl, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });

        // console.log("🚀 ~ fetchDivisionData ~ response:", response)

        if (response.status !== 200) {
          throw Error("Error while fetching");
        }

        const listOfDivisi = response.data.data.map((data) => ({
          label: data.d_name,
          value: data.d_id,
        }));

        const divisionId = parseInt(this.divisionId);
        // console.log("🚀 ~ fetchDivisionData ~ divisionId:", divisionId);
        const divisiList = listOfDivisi.filter((data) => data.value === divisionId);

        this.divisiOptions = listOfDivisi;
        this.divisi = divisiList[0];
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async fetchPersonData() {
      const loginUrl = "https://office.onic.co.id/api/master/employee/active";

      // Make the POST request using fetch
      try {
        const response = await axios.get(loginUrl, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });

        // console.log("🚀 ~ fetchPersonData ~ response:", response)

        if (response.status !== 200) {
          throw Error("Error while fetching");
        }

        const branch = this.branch.label;
        const division = this.divisi.label;

        const filteredData = response.data.data.filter(
          (user) => user.company_name === branch && user.division === division
        );

        // console.log("🚀 ~ fetchPersonData ~ filteredData:", filteredData)

        const userRolesMap = {};

        this.roles.forEach((role) => {
          userRolesMap[role.u_id] = role;
        });

        const listOfPerson = filteredData.map((data) => ({
          label: data.name,
          value: data.id,
          title: userRolesMap[data.id] ? userRolesMap[data.id].role : "",
        }));

        const filteredTitle = listOfPerson.filter(
          (user) =>
            user.title !== "director" &&
            user.title !== "direktur" &&
            user.title !== "admin"
        );

        const personId = parseInt(this.personId);
        const personList = filteredTitle.filter((user) => user.value === personId);
        this.personOptions = filteredTitle;
        this.filteredPersonOptions = filteredTitle;
        this.person = personList.length > 0 ? personList[0] : this.personOptions[0];
        // console.log("Selected Person:", this.person);
        eventBus.$emit("person-selected", this.person);
        // this.fetchDataTable(person);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async fetchBranchData() {
      // const loginUrl = "https://office.onic.co.id/api/master/company-entity?status=null";

      try {
        const branches = sessionStorage.getItem("branches");
        if (branches) {
          this.branches = JSON.parse(branches);
        }

        const listOfBranch = this.branches.map((branch) => ({
          label: branch.company.c_name,
          value: branch.company.c_id,
        }));

        const branchId = parseInt(this.branchId);
        const branchesList = listOfBranch.filter((user) => user.value === branchId);

        this.branchOptions = listOfBranch;
        this.branch = branchesList[0];
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    redirectToTaskMonitoring(statusFilter) {
      if (this.title.toLowerCase() === "operator") {
        this.$router.push({
          path: `/${this.title.toLowerCase()}/task_list`,
          query: { status: statusFilter },
        });
      } else if (this.title.toLowerCase() === "direktur") {
        this.$router.push({
          path: "/director/task_monitoring",
          query: { status: statusFilter },
        });
      } else {
        this.$router.push({
          path: `/${this.title.toLowerCase()}/task_monitoring`,
          query: { status: statusFilter },
        });
      }
    },
  },
};
</script>

<style scoped>
.card-icon {
  border-radius: 6px;
}

.my-card {
  width: 175px;
}

.title-card {
  border-radius: 20px;
}

.under-title {
  border-radius: 8px;
}

.bintang {
  border-radius: 18px;
}
</style>
