import { promises as fs, PathLike } from "fs";
import path from "path";
import * as cheerio from "cheerio";
import techs from "./techs.json";

async function main() {
  const folderList = [
    "./seicing.github.io/html/aoe2/unitaoe4",
    "./seicing.github.io/html/aoe2/buildingsaoe4",
    "./seicing.github.io/html/aoe2/buildingsaoe4/landmark",
  ];

  let files: PathLike[] = [];
  for (const folder of folderList) {
    const tempList = await fs.readdir(folder);
    const tempFiles = tempList
      .filter((temp) => temp.endsWith(".html"))
      .map((temp) => {
        return path.join(folder, temp);
      });
    files = files.concat(tempFiles);
  }

  console.log("files: ", files);

  const result: { [key: string]: string } = {
    "Upgrade to Elite": "升级为精锐",
    "Upgrade to Veteran": "升级为老练",
    "Upgrade to Early": "升级为早期",
    "Capital Town Center": "首都城市中心",
    "Golden Age Tier 1": "黄金时代1",
    "Golden Age Tier 2": "黄金时代2",
    "Golden Age Tier 3": "黄金时代3",
    "Golden Age Tier 4": "黄金时代4",
    "Golden Age Tier 5": "黄金时代5",
    "Abbasid Dynasty": "阿巴斯王朝",
    Ayyubids: "阿尤布王朝",
    Byzantines: "拜占庭帝国",
    Chinese: "中国",
    "Delhi Sultanate": "德里苏丹国",
    English: "英国",
    French: "法国",
    "Holy Roman Empire": "神圣罗马帝国",
    Mongols: "蒙古",
    Rus: "俄罗斯",
    Japanese: "日本",
    "Jeanne d'Arc": "贞德",
    Malians: "马里",
    "Order of the Dragon": "龙之骑士团",
    Ottomans: "奥斯曼帝国",
    "Zhu Xi's Legacy": "朱熹的遗产",
    Imam: "伊玛目",
    "Huihui Pao": "回回炮",
    "Royal Cannon": "皇家加农炮",
    "Clocktower Battering Ram": "钟楼攻城槌",
    "Clocktower Bombard": "钟楼手推炮",
    "Clocktower Counterweight Trebuchet": "钟楼配重式巨型投石机",
    "Clocktower Nest of Bees": "钟楼一窝蜂",
    "Clocktower Springald": "钟楼扭力弩炮",
    "Palace Guard": "皇宫卫兵",
    "Sultan's Elite Tower Elephant": "苏丹的精锐塔象",
    "Wynguard Footman": "温嘉德步兵",
    "Wynguard Ranger": "温嘉德长弓兵",
    "Royal Culverin": "皇家长管炮",
    "Royal Ribauldequin": "皇家风琴炮",
    "Freeborn Warrior": "自由民战士",
    "Mansa Javelineer": "曼萨掷枪兵",
    "Khaganate Elite Horse Archer": "汗国精锐骑射手",
    "Khaganate Elite Knight": "汗国精锐骑士",
    "Khaganate Elite Mangudai": "汗国精锐突骑",
    "Khaganate Nest of Bees": "汗国一窝蜂",
    "Khaganate Elite Palace Guard": "汗国精锐皇宫卫兵",
    "Khaganate Warrior Monk": "汗国僧侣战士",
    "Camel Rider Barding": "骆驼骑兵皮甲",
    "Culture Wing": "文化偏殿",
    "Economic Wing": "经济偏殿",
    "Military Wing": "军事偏殿",
    "Public Libraries": "公共图书馆",
    "Trade Wing": "贸易偏殿",
    Spyglass: "小型望远镜",

    "Imperial Examinations": "科举制",
    Paiks: "派克斯",
    "Castle Age King": "城堡时代之王",
    "Imperial Age King": "帝国时代之王",
    "Two-Handed Weapons": "双手武器",
    Tawara: "塔瓦拉",
    "Castle Age Shinobi": "城堡时代忍者",
    "Imperial Age Shinobi": "帝国时代忍者",
    "Javelin Emplacement": "标枪槽",
    "Steppe Lancers": "草原长矛骑兵",
    "Steppe Lancers (Improved)": "草原长矛骑兵(已强化)",
    "Stone Commerce (Improved)": "石料商业(已强化)",
    "Scale Armor": "鳞甲",
    "Janissary Company": "苏丹亲兵连队",
    "Castle Age Militia": "城堡时代民兵",
    "Imperial Age Militia": "帝国时代民兵",
    "King's Palace": "王宫",
    "Military School": "军事学校",
    "Upgrade to Elite Fire Lancer": "升级为精锐火长矛骑兵",
    "Upgrade to Man-at-Arms": "升级为武士",
    "Elite Warrior Scout": "精锐战士侦察兵",
    "Veteran Warrior Scout": "老练战士侦察兵",
    "Upgrade to Horseman": "升级为骑手",
    "Upgrade to Knight": "升级为长矛骑兵",
    "Upgrade to Grenadiers": "升级为掷弹兵",
    "Upgrade to Palace Guards": "升级为皇宫卫兵",
    "Camel Unease": "骆驼惊吓",
    Conversion: "招降",
    Detonate: "引爆",
    "House of Wisdom Influence": "智慧宫影响",
    "Man The Sails": "掌舵人",
    Proselytize: "传教",
    "Quick Strike": "快速打击",
    "Ring the Town Bell": "敲钟",
    "Atabeg Supervision": "阿塔贝格监督",
    "Desert Raider Blade": "沙漠掠夺者之刃",
    "Desert Raider Bow": "沙漠掠夺者之弓",
    "Mass Heal": "群体治疗",
    "Structural Reinforcements": "结构加固",
    "Swap Weapon (Incendiary)": "切换武器（燃烧弹）",
    "Swap Weapon (Kinetic)": "切换武器（固体弹）",
    "Tactical Charge": "战术冲锋",
    "Akritoi Defense": "阿克里托伊防御",
    "Artillery Shot": "火炮射击",
    "Automatic Pilgrim Flask": "自动朝圣者之瓶",
    Berserking: "狂战士",
    "Border Settlement": "边境聚落",
    Conscriptio: "征兵",
    Dialecticus: "辩证法",
    "Emperor's Guard": "帝王卫兵",
    "Field Stones": "野外石料",
    "Improved Torch": "改良火把",
    Irrigated: "灌溉",
    "Naval Deployment": "海军部署",
    "Oil Commerce": "橄榄油贸易",
    "Olive Harvest": "收获橄榄油",
    "Pilgrim Flask": "朝圣者之瓶",
    "Place Palings": "拒马",
    Praesidium: "水池 - 保护",
    "Royal Knight Charge Damage": "皇家骑士冲锋",
    "Shield Wall": "盾墙",
    "Synergistic Crops": "协同种植",
    Trample: "践踏",
    Triumph: "凯旋",
    "Upgrade to Hardened": "升级为坚韧",

    "Advancement\n(Bonus Culture Wing)": "文化偏殿: 升级",
    "Logistics\n(Bonus Culture Wing)": "文化偏殿: 后勤学",
    "Growth\n(Bonus Economic Wing)": "经济偏殿: 发展",
    "Industry\n(Bonus Economic Wing)": "经济偏殿: 工业",
    "Master Smiths\n(Bonus Military Wing)": "军事偏殿: 铁匠大师",
    "Reinforcement\n(Bonus Military Wing)": "军事偏殿: 援军",
    "Advisors\n(Bonus Trade Wing)": "商业偏殿: 顾问",
    "Bazaar\n(Bonus Trade Wing)": "商业偏殿: 集市",

    "Advancement\n(Castle Culture Wing)": "文化偏殿: 升级",
    "Logistics\n(Castle Culture Wing)": "文化偏殿: 后勤学",
    "Growth\n(Castle Economic Wing)": "经济偏殿: 发展",
    "Industry\n(Castle Economic Wing)": "经济偏殿: 工业",
    "Master Smiths\n(Castle Military Wing)": "军事偏殿: 铁匠大师",
    "Reinforcement\n(Castle Military Wing)": "军事偏殿: 援军",
    "Advisors\n(Castle Trade Wing)": "商业偏殿: 顾问",
    "Bazaar\n(Castle Trade Wing)": "商业偏殿: 集市",

    "Advancement\n(Feudal Culture Wing)": "文化偏殿: 升级",
    "Logistics\n(Feudal Culture Wing)": "文化偏殿: 后勤学",
    "Growth\n(Feudal Economic Wing)": "经济偏殿: 发展",
    "Industry\n(Feudal Economic Wing)": "经济偏殿: 工业",
    "Master Smiths\n(Feudal Military Wing)": "军事偏殿: 铁匠大师",
    "Reinforcement\n(Feudal Military Wing)": "军事偏殿: 援军",
    "Advisors\n(Feudal Trade Wing)": "商业偏殿: 顾问",
    "Bazaar\n(Feudal Trade Wing)": "商业偏殿: 集市",

    "Advancement\n(Imperial Culture Wing)": "文化偏殿: 升级",
    "Logistics\n(Imperial Culture Wing)": "文化偏殿: 后勤学",
    "Growth\n(Imperial Economic Wing)": "经济偏殿: 发展",
    "Industry\n(Imperial Economic Wing)": "经济偏殿: 工业",
    "Master Smiths\n(Imperial Military Wing)": "军事偏殿: 铁匠大师",
    "Reinforcement\n(Imperial Military Wing)": "军事偏殿: 援军",
    "Advisors\n(Imperial Trade Wing)": "商业偏殿: 顾问",
    "Bazaar\n(Imperial Trade Wing)": "商业偏殿: 集市",

    "Varangian Berserking": "瓦兰吉狂战士",
    "Imperial Spies": "帝国间谍",
    "Spirit Way Ancestors": "先祖皇陵",
    "The Long Wall": "长城",
    "Tower of Victory Aura": "胜利之塔光环",
    "Abbey Healing": "修道院治疗",
    "Mill Influence": "磨坊光环",
    "Network of Castles": "城堡网络",
    "Deploy Pavise": "部署大盾",
    "Royal Institute Influence": "皇家学院",
    "Castle Age Town Center Production Speed": "城堡时代城镇中心生产速度",
    "Dark Age Town Center Production Speed": "黑暗时代城镇中心生产速度",
    "Feudal Age Town Center Production Speed": "封建时代城镇中心生产速度",
    "Emergency Repairs": "紧急维修",
    "Relic Garrisoned in Docks": "在码头放置圣物",
    "Relic Garrisoned in Defensive Structures": "在防御建筑放置圣物",
    "Deflective Armor": "偏转护甲",
    "Kabura-ya": "鸣镝箭",
    "Katana Bannerman Aura": "刀剑旗本武士光环",
    "Place Yorishiro": "放置依代",
    Sabotage: "破坏",
    Shunshin: "瞬身",
    "Sohei's Sutra": "僧兵箴言",
    Spy: "间谍",
    "Treasure Caravans": "宝藏商队",
    "Uma Bannerman Aura": "骑马旗本武士光环",
    "Yumi Bannerman Aura": "弓箭旗本武士光环",
    "Bring down the walls!": "推倒城墙！",
    Consecrate: "圣化",
    "Construct the Kingdom": "建造王国",
    "Divine Arrow": "神圣之弓",
    "Divine Restoration": "神圣恢复",
    "Forward, companions!": "前进，伙伴们！",
    "Galvanize the Righteous": "鼓舞士气",
    "Holy Wrath": "神圣愤怒",
    "Honorable Heart": "荣耀之心",

    "Jeanne's Companions": "贞德的伙伴",

    "Journey of a Hero": "英雄之旅",
    "Nock your arrows!": "搭箭！",
    "Return of the Saint": "圣人回归",
    "Riders, Ready!": "骑兵就绪！",
    "Spears up!": "架矛！",
    "Strength of Heaven": "天堂之力",
    "Talented Builder": "建筑天才",
    "To Arms, Men!": "伙计们，拿起武器！",
    "Valorous Inspiration": "勇气鼓舞",
    "Activate Stealth": "潜行",
    "Coastal Navigation": "沿海航行",
    "First Strike": "先发制人",
    "Food Festival": "食物节庆",
    "Huntress' Stealth": "女猎手的潜行",
    "Military Festival": "军事节庆",
    "Siege Festival": "攻城节庆",

    "Attack Speed Arrow": "速箭",
    "Keshik Healing": "克什格疗愈",
    "Defense Arrow": "防御箭",
    "Kurultai Aura": "忽里勒台光环",
    "Maneuver Arrow": "机动箭",
    "Ovoo Influence": "敖包光环",
    "Silk Road": "丝绸之路",

    Yam: "驿站",
    "Attack Drums": "攻击战鼓",
    "Blacksmith and University Influence": "铁匠铺和大学光环",
    Fortitude: "坚毅",
    "Mehter Speed Bonus": "军乐队移速光环",
    "Melee Defense Drums": "近战防御鼓",
    "Ranged Defense Drums": "远程防御鼓",
    "Trade Protection": "贸易保护",
    Gallop: "疾驰",

    "High Armory Production Bonus": "高军械库生产加成",
    "Saint's Blessing": "圣者的祝福",
    "Static Deployment": "静态部署",
    "Ascetic Recovery": "苦行恢复",
    "Body of Iron": "钢铁之躯",
    "Bounty of Solitude": "孤独的恩惠",
    Supervise: "监督",
  };

  for (const file of files) {
    const data = await fs.readFile(file, "utf8");

    const $ = cheerio.load(data);

    const title: string = $("table")
      .first()
      .find("tr")
      .first()
      .find("td")
      .first()
      .text();

    // const chineseName = title.match(/[\u4e00-\u9fa5]+/)[0];
    // const englishName = title.match(/\(.*?\)/)[0].replace(/[()]/g, "");

    // 获取括号外的中文名
    const chineseNameMatch = title.match(/^[^\(]+/);
    const chineseName = chineseNameMatch ? chineseNameMatch[0].trim() : "";

    // 获取括号内的英文名
    const englishNameMatch = title.match(/(?<=\().+?(?=\))/);
    const englishName = englishNameMatch ? englishNameMatch[0].trim() : "";

    result[englishName] = chineseName;
  }

  Object.values(techs).reduce((_, i) => {
    let [cn, en] = i.split("<br>");
    if (containsAlphabet(en)) {
      en = en.replace("(Improved)", " (Improved)");
      console.log("en: ", en, cn);
      result[en] = cn;
    }
  });

  await fs.writeFile("names.json", JSON.stringify(result, null, 2));
}

function containsAlphabet(str: string): boolean {
  return /[A-Za-z]/.test(str);
}

main();
