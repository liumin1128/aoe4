import fs from "fs";

export const writeFile = async (path, data) => {
  return new Promise((resolve, rejects) => {
    fs.writeFile(path, JSON.stringify(data), (err) => {
      //err的值是错误对象，如果没有错误则err的值是null
      if (err) {
        console.log("写入失败!: " + path);
        rejects();
        return;
      }
      console.log("写入成功!: " + path);
      resolve(null);
    });
  });
};

export const appendFile = async (path, data) => {
  return new Promise((resolve, rejects) => {
    fs.appendFile(path, data, (err) => {
      //err的值是错误对象，如果没有错误则err的值是null
      if (err) {
        console.log("写入失败!: " + path);
        rejects();
        return;
      }
      console.log("写入成功!: " + path);
      resolve(null);
    });
  });
};
