const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");



const contactsPath = path.join(__dirname, "db", "contacts.json");

const getAll = async () => {
    
     const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);

}

const getContactById = async (id) => {
  try {
  const contacts = await getAll();

  const result = contacts.find((item) => item.id === id);

  return result || null;
}catch(error){console.log(error)}
  
};

const removeById = async (id) => {
  try {
  const allContacts = await getAll();
  const index = allContacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
}catch(error){console.log(error)}
  
};

const addContact = async ({ name, email, phone }) => {
  try {
     const allContacts = await getAll();
     const newContact = {
       id: nanoid(),
       name,
       email,
       phone,
     };
     allContacts.push(newContact);
     await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
     console.log(newContact);
     return newContact;
  }catch(error){console.log(error)}
   
}



module.exports = {
  getAll,
  getContactById,
  removeById,
  addContact,
};

