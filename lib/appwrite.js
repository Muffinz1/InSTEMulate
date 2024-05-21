import { Account, Client, ID, Avatars, Databases, Query } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.instemulate.instemulate",
    projectId: "6642b590000f2d9e838d",
    databaseId: "6642b750000717f35a73",
    userCollectionId: "6642b7b80022e940a5e2",
  };
  
 
// Init  React Native SDK
const client = new Client();
  
client
    .setEndpoint(appwriteConfig.endpoint) // Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // project ID
    .setPlatform(appwriteConfig.platform) // application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async(email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// Sign In User
export const signIn = async(email, password) => {
  try {
    const session = account.createEmailPasswordSession(email, password)
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

// Get Current User
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', [currentAccount.$id])]
    )
    if (!currentUser) throw Error;
    return currentUser;
  } catch (error) {
    console.log(error);    
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    throw new Error(error);
  }
}


//Get Username
export const getUsername = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser && currentUser.documents && currentUser.documents.length > 0) {
      return currentUser.documents[0].username;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
  }
}

//Get User Avatar
export async function getUserAvatar() {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser && currentUser.documents && currentUser.documents.length > 0) {
      return currentUser.documents[0].avatar;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error);
  }
}
