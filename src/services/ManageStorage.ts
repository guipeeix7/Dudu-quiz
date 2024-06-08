import AsyncStorage from "@react-native-async-storage/async-storage";

export class ManageStorage{
    
    storageName: string;
    constructor(storageName:string) {
      this.storageName = storageName;
    }

    countData = async () => {
        const data = await AsyncStorage.getItem(this.storageName);
        return (data) ? (JSON.parse(data).length) : 0;
    }
    
    getData = async () => {
        try {
            const data = await AsyncStorage.getItem(this.storageName);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error("Error fetching users from AsyncStorage", error);
            return [];
        }
    };
    
    // Function to save users to AsyncStorage
    store = async (data: any) => {
        try {
            await AsyncStorage.setItem(this.storageName, JSON.stringify(data));
        } catch (error) {
            console.error("Error saving users to AsyncStorage", error);
        }
    };
      
    // Function to add a new user to AsyncStorage
    addData = async (newUser: any) => {
        try {
            const users = await this.getData();
            users.push(newUser);
            await this.store(users);
        } catch (error) {
            console.error("Error adding user to AsyncStorage", error);
        }
    };

    getAllData = async() => {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (error, stores) => {
                stores.map((result, i, store) => {
                console.log({ [store[i][0]]: store[i][1] });
                return true;
                });
            });
        });
    }

    clearAsyncStorage = async() => {
        AsyncStorage.clear();
    }

    clearAsyncStorageKey = async () => {
        try {
          await AsyncStorage.removeItem(this.storageName);
          console.log(`Key "${this.storageName}" removed successfully.`);
        } catch (error) {
          console.error(`Error removing key "${this.storageName}":`, error);
        }
      };
}