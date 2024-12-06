import civs_translated_CN from "./civs_translated_CN.json";
import fs from "fs";

const civs = {};
Object.keys(civs_translated_CN).forEach((key, index) => {
  const overviewArray = Object.values(civs_translated_CN[key].overview).map(
    (item) => {
      if (item.list) {
        item.list = Object.values(item.list);
      }
      return item;
    }
  );
  console.log(overviewArray);
  civs[key] = { ...civs_translated_CN[key], overview: overviewArray };
});

fs.writeFile("./civs_CN.json", JSON.stringify(civs, null, 2), () => {
  console.log("done");
});
