let { prefix, email, password } = require("config.js");
const kalingModule = require('kaling').Kakao();
const Kakao = new kalingModule();
Kakao.init('366934bb1d3b68ada6c5dfa60f71e9bb');
Kakao.login(email, password);
const spg = require("request");
const MessageEmbed = require("message");
const commands = require("cmd.js");
function comma(x){
	 return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function response(room, msg, sender, iGC, replier, iDB, pkgName) {
  try {
    let userID = java.lang.String(iDB.getProfileImage()).hashCode();
    let blank = '​'.repeat(1000);
    reply = (chat) => {
  if (typeof chat == "object") {
    if (Object.keys(chat).includes("feed")) {
      for (let feed of chat.feed) {
        let feedData = feed.setUp(69047, room);
        replier.reply(room, feedData);
      }
    }
    if (Object.keys(chat).includes("list")) {
      for (let list of chat.list) {
        let listData = list.setUp(69049, room);
        replier.reply(room, listData);
      }
    }
    if (Object.keys(chat).includes("content")) {
      replier.reply(room, chat.content);
    }
  } else if (typeof chat == "string") {
    replier.reply(room, chat);
  }
};
    if (msg == "SPG" || msg == "SepRPG" || msg == "SEPRPG" || msg == "spg" || msg == "SPGBot" || msg == "spgbot" || msg == "seprpg") {
      let Embed = new MessageEmbed().setTitle("안녕하세요, Seprpg봇입니다.").setDescription("명령어 : " + prefix + "명령어").setThumbnail("https://sepimage.netlify.app/image/spg.png");
      reply({
  feed: [Embed]});
    } else if (msg.startsWith(prefix)) {
      let cmd = msg.slice(prefix.length).trim();
      if (cmd == "가입") {
        let result = spg.requestFunc("signUP", [userID, sender]);
        if (result.isSign) {
          let Embed = new MessageEmbed().setTitle("회원가입을 이미 하셨네요!").setDescription("'" + prefix + "도움말'로 게임을 플레이 해보세요!").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입에 성공하였습니다!").setDescription("SepRPG(SPG)를 즐겨보세요!").setField("> 명령어 목록 커맨드", "> " + prefix + "명령어", "https://sepcod.com").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      } else if (cmd == "랭킹" || cmd == "랭크") {
        let result = spg.requestFunc("getRank", [userID]);
        if (result.isSign) {
          let ranks = result.rank.map((e, i) => {
  if (e == null) {
    return {
  "name": (i + 1) + "등 | # 알 수 없음", 
  "value": "Level : 0Lv | Exp : 0Xp", 
  "url": "https://sepcod.com"};
  } else {
    return {
  "name": (i + 1) + "등 | " + e.name, 
  "value": "Level : " + e.level + "Lv | Exp : " + comma(e.exp) + "Xp", 
  "url": "https://sepcod.com/copy?text=" + e.id};
  }
});
          let rankEmbed = new MessageEmbed().setTitle("SPG랭킹(레벨 기준)").setFields(ranks).setThumbnail("https://sepimage.netlify.app/image/ranking.png");
          reply({
  list: [rankEmbed]});
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      } else if (cmd == "정보" || cmd == "스탯") {
        replier.reply("SPG서버에서 정보를 불러오고 있습니다...");
        let result = (spg.requestFunc("getUser", [userID]));
        let userStat = spg.requestFunc("getDefAtt", [userID]);
        java.lang.Thread.sleep(1000);
        if (result.isSign) {
          let infoText = result.data.name + " (" + userID + ")님의 스탯 정보입니다\n\n아이디 : " + userID + "\n\n레벨 : " + result.data.level + "Lv/"+comma(result.data.exp)+"Xp\n\n체력 : " + result.data.hp + "Hp / 100Hp\n\n돈 : " + comma(result.data.money) + "원\n\n--------------------" + blank + "\n\n공격력 : " + userStat.att + "Att\n\n방어력 : " + userStat.def + "Def\n\n위치 : " + result.data.place.name + "\n\n설명 : " + (result.data.description.length >= 20 ? result.data.description.substring(0, 20) + "..." : result.data.description);
          reply({
  content: infoText});
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      }if(cmd == "기타" || cmd == "기타정보" || cmd == "기타 정보"){
let etcData = spg.requestFunc("getUser", [userID]);
 if(etcData.isSign){
let exchangeuser = etcData.data.exchangeuserid=="null"?"없음":((spg.requestFunc("getUser", [etcData.data.exchangeuserid])).data.name);
let mail = Object.keys(etcData.data.mail).length==0?"없음":(etcData.data.mail.name+"("+etcData.data.mail.id+") 님의 메일");
let passive = etcData.data.passive.skills.length==0?"없음":(etcData.data.passive.skills.map((e,i) => (i+1)+"번 : "+e.name+", "));
let Embed = new MessageEmbed() .setTitle("[ "+etcData.data.nickname+" ]"+etcData.data.name+"("+etcData.data.id+")님의 기타 정보입니다").setThumbnail(etcData.data.nickimage).setFields([{ name: "교환권 갯수", value: "> "+etcData.data.exchangeticket+"개", inline: true },{ name: "교환 중인 유저", value: "> "+exchangeuser, inline: true },{name: "던전 입장권 갯수", value: "> "+etcData.data.ticket+"개", inline: true},{ name: "확성기 갯수", value: "> "+etcData.data.mic+"개", inline: true },{ name: etcData.data.name+"님에게 온 메일", value: "> "+mail, inline: true },{ name: "패시브 스킬 목록", value: "> "+passive, inline: true },{ name: "버프", value: "> 버프 : "+((etcData.data.buff.att == 0&&etcData.data.buff.def == 0)?"없음":(100+(etcData.data.buff.att*10))+"% 공격력 & "+(100+(etcData.data.buff.def*10))+"% 방어력"), inline: true },{ name: "디버프", value: "> 디버프 : "+((etcData.data.debuff.att == 0 && etcData.data.debuff.def == 0&& etcData.data.debuff.exp == 0)?"없음":((100-(etcData.data.debuff.att))+"% 공격력 & "+(100-(etcData.data.debuff.def))+"% 방어력 & "+(100-(etcData.data.debuff.exp))+"% 경험치")), inline: true },{ name: "가입 날짜", value: "> "+(etcData.data.join), inline: true }]);
reply({list: [Embed]}); 
}else{ 
let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png"); 
reply({feed: [Embed]}); 
}
}else if (cmd == "상점" || cmd == "상품") {
        let result = spg.requestFunc("getShop", []);
        let menus = [];
        for (let i = 0; i < result.shop.length; i++) {
          menus.push("[ " + (i +1)+ "번 ] " + result.shop[i].name + (result.shop[i].type == "weapon" ? "[무기]" : "[방패]") + "  -  " + (result.shop[i].type == "weapon" ? "공격" : "방어") + "수치 : " + (result.shop[i].type == "weapon" ? result.shop[i].att + "Att" : result.shop[i].def + "Def") + " | 비용 : " + comma(result.shop[i].cost) + "원\n\n");
        }
        reply({
  content: "구입할 무기/방패를 선택해주세요\n\n'" + prefix + "구매 [상품번호]'로 구매하실 수 있습니다" + blank + "\n\n\n" + menus.join("")});
      } else if (cmd == "훈련" || cmd == "사냥") {
        let result = spg.requestFunc("hunt", [userID]);
        if (result.isSign) {
          if (result.reason) {
            let Embed = new MessageEmbed().setTitle(result.reason).setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          } else {
            let msgEmbed = new MessageEmbed().setTitle("훈련에 성공했습니다").setDescription("훈련 10회를 하시려면 '" + prefix + "훈련10'을 해주세요").setFields([{
  name: "> 현재 돈", 
  value: comma(result.data.money) + "(+" + comma(result.monster.gift.money) + ")", 
  "url": "https://sepcod.com/seprpg"}, {
  name: "> 현재 체력", 
  value: result.data.hp + "(-" + result.monster.hp + ")", 
  url: "https://sepcod.com/seprpg"}, {
  name: "> 현재 경험치", 
  value: comma(result.data.exp) + "(+" + comma(result.monster.gift.exp) + ")", 
  url: "https://sepcod.com/seprpg"}]).setThumbnails(["https://sepimage.netlify.app/image/spg.png", "https://sepimage.netlify.app/image/spg.png", "https://sepcod.com/images/Logo.svg"]);
            reply({
  list: [msgEmbed]});
          }
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      }else if(cmd.startsWith("구매") || cmd.startsWith("구입")){
          let item = Number(cmd.slice(2).trim())-1;
          let buy = spg.requestFunc("buy", [userID, item]); 
if(buy.reason){ 
	let Embed = new MessageEmbed()
.setHeader(buy.reason); 
reply({feed : [Embed]})
}else{
let Embed = new MessageEmbed() .setHeader(buy.user.name+"님이 성공적으로 "+buy.item.name+"을 구입했습니다!").setDescription("> TIP : "+prefix+"장착으로 한 번 착용하실 수 있습니다!"); reply({feed: [Embed]});
}
      }else if (cmd == "훈련10" || cmd == "훈련 10" || cmd == "사냥 10" || cmd == "사냥10") {
        let result = spg.requestFunc("huntContinuity", [userID, 10]);
        if (result.isSign) {
          if (result.reason) {
            let Embed = new MessageEmbed().setTitle(result.reason).setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          } else {
            let msgEmbed = new MessageEmbed().setTitle("훈련 10회를 성공했습니다").setFields([{
  name: "> 현재 돈", 
  value: comma(result.data.money) + "(+" + comma(result.monster.gift.money) + ")", 
  "url": "https://sepcod.com/seprpg"}, {
  name: "> 현재 체력", 
  value: result.data.hp + "(-" + result.monster.hp + ")", 
  url: "https://sepcod.com/seprpg"}, {
  name: "> 현재 경험치", 
  value: comma(result.data.exp) + "(+" + comma(result.monster.gift.exp) + ")", 
  url: "https://sepcod.com/seprpg"}]).setThumbnails(["https://sepimage.netlify.app/image/spg.png", "https://sepimage.netlify.app/image/spg.png", "https://sepcod.com/images/Logo.svg", "https://sepimage.netlify.app/image/clover.png"]);
            reply({
  list: [msgEmbed]});
          }
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      } else if (cmd == "명령어" || cmd == "도움말" || cmd == "도움" || cmd == "명령") {
        let cmds = commands.map(e => {
  return "> " + e.name + "  -  " + e.description + "\n\n\n";
});
        let cmdText = "Srpg명령어 목록입니다\n\n눌러서 전체보기로 보세요" + blank + "\n\n\n" + cmds.join("");
        replier.reply(room, cmdText);
      } else if (cmd == "레이드" || cmd == "보스") {
        let result = (spg.requestFunc("getRaid", [])).raid;
        let raidEmbed = new MessageEmbed().setTitle("SPG 레이드(" + result.name + "[RAID]) 정보").setThumbnails(["https://sepimage.netlify.app/image/spg.png", "https://sepimage.netlify.app/image/spg.png", "https://sepcod.com/images/Logo.svg"]).setFields([{
  name: "> 레이드 스탯", 
  value: "> 체력 : " + result.hp + "Hp", 
  url: "https://sepcod.com/seprpg"}, {
  name: "공격력 : " + result.att + "Att", 
  value: "방어력 : " + result.def + "Def", 
  url: "https://sepcod.com/seprpg"}, {
  name: "> Exp : " + comma(result.gift.exp) + "Xp", 
  value: "> Money : " + comma(result.gift.money) + "원", 
  url: "https://sepcod.com/seprpg"}]);
        reply({
  list: [raidEmbed]});
      } else if (cmd == "인벤토리" || cmd == "인벤" || cmd == "가방") {
        let result = spg.requestFunc("getInven", [userID]);
        if (result.isSign) {
          if (result.inven.length == 0) {
            let Embed = new MessageEmbed().setTitle(sender + "님의 인벤토리가 비어있습니다").setDescription("다양한 무기/방패들을 구매해보세요!");
            reply({
  feed: [Embed]});
          } else {
            let invenInfo = result.inven.map(e => {
  return e.name + "(" + (e.type == "weapon" ? "무기" : "방패") + ")  -  " + e.type == "weapon" ? "공격력 : " + e.att + "Att" : "방어력 : " + e.def + "Def\n\n";
});
            let invenText = sender + " (" + userID + ") 님의 인벤토리입니다" + blank + "\n\n" + invenInfo.join("");
            reply(invenText);
          }
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      } else if (cmd == "레이드 공격" || cmd == "레이드공격" || cmd == "공격 레이드" || cmd == "공격 레이드" || cmd == "토벌" || cmd == "보스공격" || cmd == "보스 공격" || cmd == "공격 보스" || cmd == "공격보스") {
        let result = spg.requestFunc("attackRaid", [userID]);
        if (result.bool) {
          if (result.isSign) {
            let raidEmbed = new MessageEmbed().setTitle(result.user.name + "님 " + result.raid.name + "[RAID]를 공격했습니다!").setFields([{
  name: "레이드 HP", 
  value: result.raid.hp + "(HP)", 
  url: "https://sepcod.com/seprpg"}, {
  name: result.user.name + "님의 HP", 
  value: result.user.hp + "(HP)", 
  url: "https://sepcod.com/seprpg"}, {
  name: "Exp : " + comma(result.raid.gift.exp) + "Xp", 
  value: "Money : " + comma(result.raid.gift.money) + "원", 
  url: "https://sepcod.com/seprpg"}]).setThumbnails(["https://sepimage.netlify.app/image/spg.png", "https://sepimage.netlify.app/image/spg.png", "https://sepcod.com/images/Logo.svg"]);
            reply({
  list: [raidEmbed]});
          } else {
            let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          }
        } else {
          let Embed = new MessageEmbed().setTitle(result.reason);
          reply({
  feed: [Embed]});
        }
      } else if (cmd == "체력충전" || cmd == "체력 충전" || cmd == "충전") {
        let user = spg.requestFunc("getUser", [userID]);
        if (user.isSign) {
          let result = spg.requestFunc("buyUserHp", [userID]);
          if (result.reason) {
            let Embed = new MessageEmbed().setTitle(result.reason).setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          } else {
            let Embed = new MessageEmbed().setTitle("성공적으로 체력을 충전하셨습니다!").setDescription("돈 : " + comma(result.data.money) + "원(-34,000원)").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          }
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      } else if (cmd == "도박" || cmd == "잭팟" || cmd == "확률") {
        let readyEmbed = new MessageEmbed().setTitle("도박을 시작합니다...").setDescription("도박 지불 비용 : 1000원");
        reply({
  feed: [readyEmbed]});
        let result = spg.requestFunc("jackpot", [userID]);
        if (result.isSign) {
          let JackpotEmbed = new MessageEmbed().setTitle(result.message == null ? result.reason : result.message).setDescription("확률 : 1%");
          java.lang.Thread.sleep(3000);
          reply({
  feed: [JackpotEmbed]});
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          java.lang.Thread.sleep(3000);
          reply({
  feed: [Embed]});
        }
      } else if (cmd == "장비" || cmd == "아이템") {
        let result = spg.requestFunc("heldItems", [userID]);
        if (result.isSign) {
        	Log.d(result.shield.name);
          let statEmbed = new MessageEmbed().setTitle(sender + "님이 장착하고 계신 무기/방패입니다.").setDescription("장착한 무기/방패를 바꾸시려면 \"" + prefix + "장착\"을 해주세요").setFields([{
  name: result.weapon.name, 
  value: result.weapon.att + "Att", 
  url: "https://sepcod.com"}, {
  name: result.shield.name, 
  value: result.shield.def + "Def", 
  url: "https://sepcod.com"}]).setThumbnails(["https://sepimage.netlify.app/image/spg.png", "https://sepimage.netlify.app/image/game.png"]);
          reply({
  list: [statEmbed]});
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
        //revise
      } else if (cmd.startsWith("장착") || cmd.startsWith("착용")) {
        let result = spg.requestFunc("getInven", [userID]);
        if (result.isSign) {
          if (result.inven.length == 0) {
            let invenNullEmbed = new MessageEmbed().setTitle("인벤토리가 비어있습니다").setColor("#6349ff").setDescription("상점에서 무기나 방패들을 구입해보세요").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [invenNullEmbed]});
          } else {
            let invenIndex = Number(msg.slice(prefix.length + 2).trim());
            if (result.inven.length < invenIndex || 0 > invenIndex) {
              let invenEmbed = new MessageEmbed().setTitle("번호를 잘못입력하신 것 같네요").setDescription("'" + prefix + "인벤'으로 인벤토리를 다시 확인해주세요").setThumbnail("https://sepimage.netlify.app/image/spg.png");
              reply({
  feed: [invenEmbed]});
            } else {
              let setItem = spg.requestFunc("holdItem", [userID, result.inven[invenIndex-1].type, invenIndex]);
              Log.d(JSON.stringify(setItem,null,2))
              let invenEmbed = new MessageEmbed().setTitle("성공적으로 " + setItem.data[result.inven[invenIndex-1].type]["name"] + " 을/를 장착했습니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
              reply({
  feed: [invenEmbed]});
            }
          }
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      } else if (cmd.startsWith("이름") || cmd.startsWith("이름변경")) {
        if (cmd.startsWith("이름")) {
          let name = cmd.slice(2).trim();
          let result = spg.requestFunc("setName", [userID, name]);
          if (result.isSign) {
            let nameEmbed = new MessageEmbed().setTitle(result.data + "으로 이름을 변경하셨습니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [nameEmbed]});
          } else {
            let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          }
        } else {
          let name = cmd.slice(4).trim();
          let result = spg.requestFunc("setName", [userID, name]);
          if (result.isSign) {
            let nameEmbed = new MessageEmbed().setTitle(result.data + "(으)로 이름을 변경하셨습니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [nameEmbed]});
          } else {
            let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          }
        }
      } else if (cmd.startsWith("상태메세지") || cmd.startsWith("상태") || cmd.startsWith("상메")) {
        if (cmd.startsWith("상태메세지")) {
          let description = cmd.slice(5).trim();
          let result = spg.requestFunc("setDescription", [userID, description]);
          if (result.isSign) {
            let Embed = new MessageEmbed().setTitle("상태메세지를 바꿨습니다!").setDescription("> (" + result.user.description + ")").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          } else {
            let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          }
        } else {
          let description = cmd.slice(2).trim();
          let result = spg.requestFunc("setDescription", [userID, description]);
          if (result.isSign) {
            let Embed = new MessageEmbed().setTitle("상태메세지를 바꿨습니다!").setDescription("> (" + result.user.description + ")").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          } else {
            let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          }
        }
      } else if (cmd == "칭호" || cmd == "닉네임") {
        let nicknames = spg.requestFunc("getNickList", []);
        let nickOptions = nicknames.nickname.map((e, i) => {
  return ("[ " + (i + 1) +  "번 ] : " + e + "  /  ~"+comma(Math.round(Math.pow(2, (i+1)))) + "Lv");
});
        let nickList = "전체 칭호 목록입니다\n\n칭호 기준 : (2 ^ [칭호 번호])Lv\n\n'" + prefix + "칭호선택 [칭호 번호]'로 칭호를 선택하세요" + blank + "\n\n" + nickOptions.join("\n\n");
        replier.reply(nickList);
      } else if (cmd.startsWith("칭호선택") || cmd.startsWith("칭호 선택")) {
        let index = cmd.startsWith("칭호선택") ? cmd.slice(4).trim() : cmd.slice(5).trim();
        if (isNaN(index)) {
          let Embed = new MessageEmbed().setTitle("칭호 번호를 정확하게 입력해주세요").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: Embed});
        } else {
          let result = spg.requestFunc("setNickname", [userID, Number(index) - 1]);
          if (result.reason) {
            let Embed = new MessageEmbed().setTitle(result.reason);
            reply({
  feed: [Embed]});
          } else {
            let Embed = new MessageEmbed().setTitle("성공적으로 " + result.user.nickname + "칭호를 장착하셨습니다").setThumbnail(result.user.nickimage);
            reply({
  feed: [Embed]});
          }
        }
      } else if (cmd == "맵") {
        let user = spg.requestFunc("getUser", [userID]);
        if (user.isSign) {
          let locations = (spg.requestFunc("getLocation", [])).locations;
          let locationSelectMenus = locations.map((e, i) => {
  return "[ " + e.index + "번 ] -  " + e.name;
});
          let locationText = "전체 맵 목록입니다\n\n'" + prefix + "이동 [맵 번호]'로 이동해보세요" + blank + "\n\n" + locationSelectMenus.join("");
          reply({
  content: locationText});
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      } else if (cmd.startsWith("이동 ")) {
        let index = cmd.slice(3).trim();
        if (isNaN(index)) {
          let Embed = new MessageEmbed().setTitle("맵 번호를 정확하게 입력해주세요").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        } else {
          let result = spg.requestFunc("move", [userID, Number(index) - 1]);
          if (result.reason) {
            let Embed = new MessageEmbed().setTitle(result.reason);
            reply({
  feed: [Embed]});
          } else {
            let Embed = new MessageEmbed().setTitle(result.data.name + "님이 성공적으로 " + result.data.place.name + "(으)로 이동하셨습니다").setDescription("'" + prefix + "모험'으로 몬스터를 공격해보세요").setThumbnail(result.data.nickimage);
            reply({
  feed: [Embed]});
          }
        }
      } else if (cmd == "모험" || cmd == "탐험" || cmd == "몬스터") {
        let result = spg.requestFunc("setMonster", [userID]);
        if (result.isSign) {
          if (!result.reason) {
            let Embed = new MessageEmbed().setHeader(result.data.name + "님이 몬스터를 만났습니다!").setTitle(prefix + "공격'으로 몬스터를 공격하실 수 있습니다").setDescription(prefix + "도망'으로 몬스터로 부터 도망가실 수 있습니다").setFields([{
  name: "이름 :" + result.data.target.name, 
  value: "체력 : " + result.data.target.hp + "Hp", 
  url: "https://sepcod.com/seprpg"}, {
  name: "몬스터 스탯", 
  value: result.data.target.att + "Att", 
  url: "https://sepcod.com/seprpg"}, {
  name: "몬스터 스탯", 
  value: result.data.target.def + "Def", 
  url: "https://sepcod.com/seprpg"}]).setThumbnails(["https://sepimage.netlify.app/image/spg.png", "https://sepimage.netlify.app/image/spg.png"]);
            reply({
  list: [Embed]});
          } else {
            let Embed = new MessageEmbed().setTitle(result.reason).setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          }
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      } else if (cmd == "도망" || cmd == "ㅌㅌ" || cmd == "나가" || cmd == "탈출") {
        let result = spg.requestFunc("runawayFromMonster", [userID]);
        if (result.isSign) {
          if (!result.reason) {
            let Embed = new MessageEmbed().setTitle("몬스터에게서 도망쳤습니다").setDescription("Hp : " + result.data.hp + "(-3)").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          } else {
            let Embed = new MessageEmbed().setTitle(result.reason).setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          }
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      } else if (cmd == "공격") {
        let result = spg.requestFunc("attackTarget", [userID]);
        if (result.isSign) {
          if (!result.reason) {
            let firstAttackEmbed = new MessageEmbed().setTitle(result.user.target.name + "을/를 공격합니다").setDescription("공격 중 입니다...").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [firstAttackEmbed]});
            java.lang.Thread.sleep(3000);
            if (result.isDead) {
              let attackEmbed = new MessageEmbed().setTitle("안타깝게도 사망하셨습니다...").setThumbnail("https://sepimage.netlify.app/image/sdr.png");
              reply({
  feed: [attackEmbed]});
            } else {
              let attackEmbed = new MessageEmbed().setTitle(result.monster.name + "을/를 공격했습니다").setDescription("보상 : +" + comma(result.monster.gift.exp) + "Xp / +" + comma(result.monster.gift.money) + "원").setFields([{
  name: "> 현재 체력", 
  value: result.user.hp + "Hp / 100Hp", 
  url: "https://sepcod.com"}]).setThumbnail("https://sepimage.netlify.app/image/spg.png");
              reply({
  list: [attackEmbed]});
            }
          } else {
            let Embed = new MessageEmbed().setTitle(result.reason).setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          }
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      } else if (cmd.startsWith("검색") || cmd.startsWith("찾기")) {
        let username = cmd.slice(2).trim();
        let result = spg.requestFunc("findUser", [username]);
        if (result.reason) {
          let Embed = new MessageEmbed().setTitle(result.reason).setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        } else {
          let Embed = new MessageEmbed().setTitle(username + "에 대한 검색 목록입니다.").setThumbnail(result.data[0].nickimage);
          for (let i = 0; i < (result.data.length > 5 ? 5 : result.data.length); i++) {
            Embed.setField("[ " + result.data[i].nickname + " ] " + result.data[i].name + " | " + result.data[i].level + "Lv", "ID : " + result.data[i].id, "https://sepcod.com/copy?text=" + result.data[i].id);
          }
          reply({
  feed: [Embed]});
        }
      } else if (cmd == "던전") {
        let result = spg.requestFunc("setDungeon", [userID]);
        if (result.isSign) {
          if (!result.reason) {
            let readyEmbed = new MessageEmbed().setTitle("던전을 둘러봅니다...").setThumbnail("https://sepimage.netlify.app/image/spg.png");
            let Embed = new MessageEmbed().setThumbnails(["https://sepimage.netlify.app/image/spg.png", "https://sepimage.netlify.app/image/spg.png", "https://sepcod.com/images/Logo.svg"]).setTitle("몬스터를 만났습니다!").setDescription("'" + prefix + "던전 공격'으로 던전 몬스터를 공격하세요!").setFields([{
  name: "> " + result.target.name + "(이)가 등장했습니다!", 
  value: "HP : " + result.target.hp, 
  url: "https://sepcod.com/seprpg"}, {
  name: result.target.att + "Att", 
  value: result.target.def + "Def", 
  url: "https://sepcod.com/seprpg"}, {
  name: comma(result.target.gift.exp) + "Xp", 
  value: comma(result.target.gift.money) + "원", 
  url: "https://sepcod.com/seprpg"}]);
            reply({
  feed: [readyEmbed]});
            let delay = (Math.floor(Math.random() * 10) + 1) * 1000;
            java.lang.Thread.sleep(delay);
            reply({
  list: [Embed]});
          } else {
            let Embed = new MessageEmbed().setTitle(result.reason).setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          }
        } else {
          let Embed = new MessageEmbed().setTitle("회원가입을 하지 않으셨네요!").setDescription("먼저 회원가입을 해주시길 바랍니다").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        }
      } else if (cmd == "입장권" || cmd == "던전 입장권" || cmd == "던전입장권") {
        let ticketEmbed = new MessageEmbed().setTitle("던전 입장권 상점").setDescription("입장권 1장 가격 : 1 다이아몬드").setFields([{
  name: "> 입장권 구매 방법", 
  value: "> " + prefix + "입장권구매 [입장권 갯수]", 
  url: "https://sepcod.com/seprpg"}, {
  name: "> 입장권 1장 가격", 
  value: "=> 1 다이아몬드", 
  url: "https://sepcod.com/seprpg"}, {
  name: "> 입장권 10장 가격", 
  value: "=> 10 다이아몬드", 
  url: "https://sepcod.com/seprpg"}, {
  name: "> 입장권 100장 가격", 
  value: "=> 100 다이아몬드", 
  url: "https://sepcod.com/seprpg"}]).setThumbnails(["https://sepimage.netlify.app/image/spg.png", "https://sepimage.netlify.app/image/spg.png", "https://sepcod.com/images/Logo.svg"]);
        reply({
  list: [ticketEmbed]});
      } else if (cmd.startsWith("입장권구매") || cmd.startsWith("입장권 구매")) {
        let ticket = cmd.startsWith("입장권구매") ? cmd.slice(5).trim() : cmd.slice(6).trim();
        if (isNaN(ticket)) {
          let Embed = new MessageEmbed().setTitle("입장권 갯수를 정확하게 입력해주세요").setThumbnail("https://sepimage.netlify.app/image/spg.png");
          reply({
  feed: [Embed]});
        } else {
          let result = spg.requestFunc("buyTicket", [userID, Number(ticket)]);
          if (result.reason) {
            let Embed = new MessageEmbed().setTitle(result.reason).setThumbnail("https://sepimage.netlify.app/image/spg.png");
            reply({
  feed: [Embed]});
          } else {
            let Embed = new MessageEmbed().setTitle("성공적으로 입장권 " + comma(ticket) + "개를 구입했습니다").setThumbnail("https://sepcod.com/images/Logo.svg").setDescription("현재 입장권 갯수 : " + comma(result.user.ticket) + "개");
            reply({
  feed: [Embed]});
          }
        }
      }
    }
  }  catch (error) {
  Api.compile("Seprpg");
  let date = new Date();
  Log.e(error.message + "    -    " + date.getMonth() + " / " + date.getDate() + " / " + date.getHours() + " / " + date.getMinutes());
}
}
