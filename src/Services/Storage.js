import AsyncStorage from "@react-native-async-storage/async-storage";

const Storage = {
  getItem: async (key) => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  },

  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
    }
  },

  updateItem: async (key, updater) => {
    try {
      const currentValue = await Storage.getItem(key);
      const updatedValue = updater(currentValue);
      await Storage.setItem(key, updatedValue);
    } catch (error) {
      console.error(`Error updating item ${key}:`, error);
    }
  },
};

export default Storage;
