const fields = {
  userRegister: ['id', 'fullName', 'createdAt'],
  userFind: ['id', 'fullName', 'deletedAt'],
  userUpdate: ['id', 'fullName', 'updatedAt'],
  userRestore: ['id', 'fullName', 'email'],

  categoryFind: ['id', 'name', 'parentId', 'deletedAt'],
  categoryCreate: ['id', 'name', 'createdAt'],
};

export default fields;
