import patchEN from "./patch_en.json";
import patchCNSmall from "./patch_cn_small.json";
import fs from "fs";
import set from "lodash/set";

// 处理原始信息，生产较小的json文件便于翻译
const getSmallEN = () => {
  const sss = {};
  patchEN.map((a, aDx) => {
    sss[`[${aDx}].name`] = a.name;
    a.sections.map((b, bDx) => {
      sss[`[${aDx}].sections[${bDx}].title`] = b.title;
      sss[`[${aDx}].sections[${bDx}].subtitle`] = b.subtitle;
      b.changes.map((c, cDx) => {
        c.diff.map((d, dDx) => {
          sss[`[${aDx}].sections[${bDx}].changes[${cDx}].diff[${dDx}][1]`] =
            d[1];
        });
      });
    });
  });

  fs.writeFile("patch_en_small.json", JSON.stringify(sss), () => {});
};

// 将翻译好的文件合并到原始文件中
const getPatchCN = () => {
  const sss = patchEN;
  Object.keys(patchCNSmall).map((key) => {
    set(sss, key, patchCNSmall[key]);
  });

  console.log("sss");
  console.log(sss);

  fs.writeFile("patch_cn.json", JSON.stringify(sss), () => {});
};

// 生成带有i18n key的json文件
const getPatches = () => {
  const sss = patchEN;
  Object.keys(patchCNSmall).map((key) => {
    set(sss, key, key.replace(/[\]]/g, "").replace(/[\[]/g, "."));
  });
  fs.writeFile("patches.json", JSON.stringify(sss), () => {});
};

getPatches();
