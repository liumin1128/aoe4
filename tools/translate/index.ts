import { civilizations, units } from "@data/sdk";
import "./openai";

interface Translation {
  name?: string;
  description?: string;
}

// const civsTrans: Translation[] = civilizations.list.map((civ) => {
//   return {
//     name: civ.name,
//     description: civ.description,
//   };
// });

const unitsTrans: Translation[] = units
  // .where({ civilization: "ab" })
  // .filter((i) => i.civs.length === 1)
  .order("hitpoints", "age")
  .map((unit) => {
    return {
      name: unit.name,
      description: unit.description,
    };
  })
  .splice(0, 10);

console.log(unitsTrans);

// async function test() {
//   console.log("llm");
//   console.log(llm);

//   const aiMsg = await llm.invoke([
//     ["system", ""],
//     ["human", "讲个笑话"],
//   ]);
//   console.log("aiMsg.content");
//   console.log(aiMsg.content);
// }

// test();
