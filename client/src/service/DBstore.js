import { EventEmitter } from "fbemitter";
import Axios from "axios";

class DBStore {
  constructor() {
    this.data = [];
    this.axios = Axios.create();
    this.emitter = new EventEmitter();
  }

  async getCompanies() {
    this.axios
      .get("/api/companies")
      .then((response) => {
        this.data = response.data;
        this.emitter.emit("GET_COMPANIES_SUCCESS");
      })
      .catch((error) => {
        console.warn(error);
        this.emitter.emit("GET_COMPANIES_FAILED");
      });
  }

  async deleteCompany(id) {
    return await this.axios.delete("/api/companies/" + id);
  }

  async getFounders(id) {
    return await this.axios
      .get(`/api/companies/${id}/founders`)
      .then((response) => {
        this.data = response.data;
        this.emitter.emit("GET_FOUNDERS_SUCCESS");
      })
      .catch((error) => {
        console.warn(error);
        this.emitter.emit("GET_FOUNDERS_SUCCESS");
      });
  }

  async getFounder(founderId) {
    return await this.axios
      .get(`/api/founders/${founderId}`)
      .then((response) => {
        this.data = response.data;
        this.emitter.emit("GET_FOUNDER_SUCCESS");
      })
      .catch((error) => {
        console.warn(error);
        this.emitter.emit("GET_FOUNDER_SUCCESS");
      });
  }

  async deleteFounder(comapnyId, founderId) {
    return await this.axios.delete(
      `/api/companies/${comapnyId}/founders/${founderId}`
    );
  }
}

const store = new DBStore();

export default store;
