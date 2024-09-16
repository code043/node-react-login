class GetUsers {
  repositorio;
  constructor(service) {
    this.repositorio = service;
  }
  async execute() {
    return await this.repositorio.getUsers();
  }
}
export default GetUsers;
