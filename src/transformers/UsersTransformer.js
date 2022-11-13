export default class UsersTransformer {
  static usersInformationById(usersArray) {
    let userObject = {}
    for (const user in usersArray) {
      const idUser = usersArray[user].uid
      userObject[idUser] = usersArray[user]
    }

    return userObject
  }
}
