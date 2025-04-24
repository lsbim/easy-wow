// 현 시즌 던전ID 목록(기준: WCL 던전ID), shortName은 유저에게 익숙한 Raider 애드온 기준
export const mplusDungeonList = [
  { id: 12661, koName: "잿불맥주 양조장", shortName: "양조장" },
  { id: 12651, koName: "어둠불꽃 동굴", shortName: "어둠불꽃" },
  { id: 12773, koName: "작전명: 수문", shortName: "수문" },
  { id: 112098, koName: "작전명: 메카곤 - 작업장", shortName: "작업장" },
  { id: 12649, koName: "신성한 불꽃의 수도원", shortName: "수도원" },
  { id: 61594, koName: "왕노다지 광산!!", shortName: "왕노" },
  { id: 12648, koName: "부화장", shortName: "부화장" },
  { id: 62293, koName: "고통의 투기장", shortName: "투기장" },
];

export function getKoDungeonName(dungeonId) {
  const foundDungeon = mplusDungeonList?.find(dungeon => dungeon?.id == dungeonId);

  return foundDungeon ? foundDungeon?.koName : '';
}


// 출력에 제외할 보스 스킬들
export const bannedBossSkills = [
  439522, // 실타래 2넴 협응보 자리바꾸기. 두마리가 서로 1~2초 간격으로 써서 타임라인이 지저분해짐
  435012, // 아라카라 2넴 꿰뚫기(임페일) 브레스. 시도때도 없이 발사해서 타임라인이 지저분해짐. 피할수도 있어서 추적의미X
  270183, // 보랄러스 막넴 물뿌리기 바닥. 맞으면 죽고 피하면 그만인 스킬이라 제외
  453141, // 새인호 1넴 무너지는밤. 같은 스킬 453140과 겹쳐 제외
  433731,
  439506, // 위와 같은 스킬. 아라카라 2넴 잠복 돌진
  439749, // 바위금고 스카모락 시작 이벤트.
  326629,
  320359,
  320200, // 위 2개와 함께 추적 필요없는 죽상 스티치플래시 스킬
  321894, // 죽상 4넴 날토르 어둠의추방
  274002, // 보랄 1넴 쫄소환
  461513,
  449985,
  322563, // 쓸일없음
  448953, // 그림바톨 1넴 보스입구막는 스킬
  456773,
  435560,
  283421,
  1216443,
  444609,
  260318,
  260190,
  444034,
  419870,
  424958,
  181089,
  1215747,
  1222949,
  473540,
  1223803,
  474087,
  455219,
  1214324,
];