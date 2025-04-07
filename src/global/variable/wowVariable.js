export const wowClassList = [
    {
        "id": 1,
        "name": "DeathKnight",
        "koName": "죽음의기사",
        "specs": [
            {
                "id": 1,
                "name": "Blood",
                "koName": "혈기"
            },
            {
                "id": 2,
                "name": "Frost",
                "koName": "냉기"
            },
            {
                "id": 3,
                "name": "Unholy",
                "koName": "부정",
            }
        ]
    },
    {
        "id": 2,
        "name": "Druid",
        "koName": "드루이드",
        "specs": [
            {
                "id": 1,
                "name": "Balance",
                "koName": "조화",
                "has": true
            },
            {
                "id": 2,
                "name": "Feral",
                "koName": "야성",
            },
            {
                "id": 3,
                "name": "Guardian",
                "koName": "수호",
            },
            {
                "id": 4,
                "name": "Restoration",
                "koName": "회복",
            }
        ]
    },
    {
        "id": 3,
        "name": "Hunter",
        "koName": "사냥꾼",
        "specs": [
            {
                "id": 1,
                "name": "BeastMastery",
                "koName": "야수",
            },
            {
                "id": 2,
                "name": "Marksmanship",
                "koName": "사격",
            },
            {
                "id": 3,
                "name": "Survival",
                "koName": "생존",
            }
        ]
    },
    {
        "id": 4,
        "name": "Mage",
        "koName": "마법사",
        "specs": [
            {
                "id": 1,
                "name": "Arcane",
                "koName": "비전",
            },
            {
                "id": 2,
                "name": "Fire",
                "koName": "화염",
            },
            {
                "id": 3,
                "name": "Frost",
                "koName": "냉기",
            }
        ]
    },
    {
        "id": 5,
        "name": "Monk",
        "koName": "수도사",
        "specs": [
            {
                "id": 1,
                "name": "Brewmaster",
                "koName": "양조",
            },
            {
                "id": 2,
                "name": "Mistweaver",
                "koName": "운무",
            },
            {
                "id": 3,
                "name": "Windwalker",
                "koName": "풍운",
            }
        ]
    },
    {
        "id": 6,
        "name": "Paladin",
        "koName": "성기사",
        "specs": [
            {
                "id": 1,
                "name": "Holy",
                "koName": "신성",
            },
            {
                "id": 2,
                "name": "Protection",
                "koName": "보호",
            },
            {
                "id": 3,
                "name": "Retribution",
                "koName": "징벌",
            }
        ]
    },
    {
        "id": 7,
        "name": "Priest",
        "koName": "사제",
        "specs": [
            {
                "id": 1,
                "name": "Discipline",
                "koName": "수양",
                "has": true
            },
            {
                "id": 2,
                "name": "Holy",
                "koName": "신성",
            },
            {
                "id": 3,
                "name": "Shadow",
                "koName": "암흑",
            }
        ]
    },
    {
        "id": 8,
        "name": "Rogue",
        "koName": "도적",
        "specs": [
            {
                "id": 1,
                "name": "Assassination",
                "koName": "암살",
            },
            {
                "id": 3,
                "name": "Subtlety",
                "koName": "잠행",
            },
            {
                "id": 4,
                "name": "Outlaw",
                "koName": "무법",
            }
        ]
    },
    {
        "id": 9,
        "name": "Shaman",
        "koName": "주술사",
        "specs": [
            {
                "id": 1,
                "name": "Elemental",
                "koName": "정기",
            },
            {
                "id": 2,
                "name": "Enhancement",
                "koName": "고양",
            },
            {
                "id": 3,
                "name": "Restoration",
                "koName": "복원",
            }
        ]
    },
    {
        "id": 10,
        "name": "Warlock",
        "koName": "흑마법사",
        "specs": [
            {
                "id": 1,
                "name": "Affliction",
                "koName": "고통",
            },
            {
                "id": 2,
                "name": "Demonology",
                "koName": "악마",
            },
            {
                "id": 3,
                "name": "Destruction",
                "koName": "파괴",
            }
        ]
    },
    {
        "id": 11,
        "name": "Warrior",
        "koName": "전사",
        "specs": [
            {
                "id": 1,
                "name": "Arms",
                "koName": "무기",
            },
            {
                "id": 2,
                "name": "Fury",
                "koName": "분노",
            },
            {
                "id": 3,
                "name": "Protection",
                "koName": "방어",
            }
        ]
    },
    {
        "id": 12,
        "name": "DemonHunter",
        "koName": "악마사냥꾼",
        "specs": [
            {
                "id": 1,
                "name": "Havoc",
                "koName": "파멸",
            },
            {
                "id": 2,
                "name": "Vengeance",
                "koName": "복수",
            }
        ]
    },
    {
        "id": 13,
        "name": "Evoker",
        "koName": "기원사",
        "specs": [
            {
                "id": 1,
                "name": "Devastation",
                "koName": "황폐",
            },
            {
                "id": 2,
                "name": "Preservation",
                "koName": "보존",
            },
            {
                "id": 3,
                "name": "Augmentation",
                "koName": "증강",
                "has": true
            }
        ]
    }
]

export function getKoClassName(className) {
    const foundClass = wowClassList?.find(item => item?.name === className);

    return foundClass ? foundClass?.koName : className
}

export function getKoSpecName(className, specName) {
    const foundClass = wowClassList?.find(item => item?.name === className);
    if (!foundClass) {
        return specName;
    }

    const foundSpec = foundClass?.specs?.find(spec => spec?.name === specName);
    return foundSpec ? foundSpec?.koName : specName
}

export function getKoClassAndSpecName(className, specName) {
    const myName = getKoSpecName(className, specName) + " " + getKoClassName(className)
    return myName ? myName : className
}

export const testObj = {
    "series": [
        {
            "damageTaken": [
						{
							"timestamp": 5582802,
							"type": "damage",
							"sourceID": 3,
							"targetID": 3,
							"abilityGameID": 300612,
							"fight": 2,
							"buffs": "235313.457674.",
							"hitType": 1,
							"amount": 0,
							"unmitigatedAmount": 252103,
							"absorbed": 252103,
							"isAoE": false
						},
						{
							"timestamp": 5591012,
							"type": "damage",
							"sourceID": 48,
							"targetID": 3,
							"abilityGameID": 447439,
							"fight": 2,
							"buffs": "449331.235313.457674.",
							"hitType": 1,
							"amount": 483912,
							"mitigated": 593910,
							"unmitigatedAmount": 2735492,
							"absorbed": 1657670,
							"isAoE": false,
							"tick": true,
							"sourceMarker": 5
						},
						{
							"timestamp": 5591513,
							"type": "damage",
							"sourceID": 48,
							"targetID": 3,
							"abilityGameID": 447439,
							"fight": 2,
							"buffs": "449331.457674.",
							"hitType": 1,
							"amount": 2140884,
							"mitigated": 594608,
							"unmitigatedAmount": 2735492,
							"isAoE": false,
							"tick": true,
							"sourceMarker": 5
						},
						{
							"timestamp": 5592004,
							"type": "damage",
							"sourceID": 48,
							"targetID": 3,
							"abilityGameID": 447439,
							"fight": 2,
							"buffs": "449331.457674.",
							"hitType": 1,
							"amount": 985838,
							"mitigated": 594609,
							"unmitigatedAmount": 2735492,
							"absorbed": 1155045,
							"isAoE": false,
							"tick": true,
							"sourceMarker": 5
						},
						{
							"timestamp": 5605868,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "457674.81782.",
							"hitType": 1,
							"amount": 1218606,
							"mitigated": 605055,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5606871,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "457674.81782.",
							"hitType": 1,
							"amount": 1218606,
							"mitigated": 605055,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5607875,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "457674.81782.",
							"hitType": 1,
							"amount": 1218606,
							"mitigated": 605055,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5608862,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "81782.",
							"hitType": 1,
							"amount": 1224764,
							"mitigated": 598897,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5609864,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "81782.",
							"hitType": 1,
							"amount": 1224765,
							"mitigated": 598896,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5610872,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "81782.",
							"hitType": 1,
							"amount": 1224764,
							"mitigated": 598897,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5611870,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "81782.",
							"hitType": 1,
							"amount": 1224764,
							"mitigated": 598897,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5612889,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "81782.",
							"hitType": 1,
							"amount": 1246870,
							"mitigated": 576791,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5613870,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "81782.",
							"hitType": 1,
							"amount": 1247166,
							"mitigated": 576495,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5643481,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "235313.55342.457674.",
							"hitType": 1,
							"amount": 0,
							"mitigated": 646724,
							"unmitigatedAmount": 1823661,
							"absorbed": 1176937,
							"isAoE": false,
							"sourceMarker": 6
						},
						{
							"timestamp": 5644409,
							"type": "damage",
							"sourceID": 48,
							"targetID": 3,
							"abilityGameID": 447439,
							"fight": 2,
							"buffs": "235313.55342.457674.",
							"hitType": 1,
							"amount": 1011503,
							"mitigated": 991153,
							"unmitigatedAmount": 2735492,
							"absorbed": 732836,
							"isAoE": false,
							"tick": true,
							"sourceMarker": 5
						},
						{
							"timestamp": 5644492,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "449331.55342.457674.",
							"hitType": 1,
							"amount": 1240881,
							"mitigated": 582780,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5645484,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "113862.449331.55342.457674.110960.",
							"hitType": 1,
							"amount": 496353,
							"mitigated": 1327308,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5646492,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "113862.449331.55342.457674.",
							"hitType": 1,
							"amount": 496353,
							"mitigated": 1327308,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5647478,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "113862.449331.55342.457674.",
							"hitType": 1,
							"amount": 496352,
							"mitigated": 1327309,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5648484,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "113862.449331.55342.457674.",
							"hitType": 1,
							"amount": 496352,
							"mitigated": 1327309,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5649485,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "55342.457674.",
							"hitType": 1,
							"amount": 1240881,
							"mitigated": 582780,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5650480,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "55342.457674.",
							"hitType": 1,
							"amount": 1240881,
							"mitigated": 582780,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5651492,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "55342.457674.",
							"hitType": 1,
							"amount": 1240881,
							"mitigated": 582780,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5657111,
							"type": "damage",
							"sourceID": 3,
							"targetID": 3,
							"abilityGameID": 300612,
							"fight": 2,
							"buffs": "55342.457674.",
							"hitType": 1,
							"amount": 252103,
							"unmitigatedAmount": 252103,
							"isAoE": false
						},
						{
							"timestamp": 5681150,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "382290.457674.",
							"hitType": 1,
							"amount": 1264636,
							"mitigated": 272559,
							"unmitigatedAmount": 1823661,
							"absorbed": 286466,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5682145,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "235313.457674.",
							"hitType": 1,
							"amount": 0,
							"mitigated": 352489,
							"unmitigatedAmount": 1823661,
							"absorbed": 1471172,
							"isAoE": false,
							"sourceMarker": 6
						},
						{
							"timestamp": 5683150,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "342246.235313.457674.",
							"hitType": 1,
							"amount": 1032571,
							"mitigated": 352489,
							"unmitigatedAmount": 1823661,
							"absorbed": 438601,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5684138,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "342246.449331.457674.",
							"hitType": 1,
							"amount": 1551102,
							"mitigated": 272559,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5685141,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "342246.449331.457674.",
							"hitType": 1,
							"amount": 1551101,
							"mitigated": 272560,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5686146,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "342246.449331.457674.",
							"hitType": 1,
							"amount": 1551102,
							"mitigated": 272559,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5687143,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "342246.449331.457674.",
							"hitType": 1,
							"amount": 1551101,
							"mitigated": 272560,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5688137,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "342246.449331.457674.",
							"hitType": 1,
							"amount": 1550974,
							"mitigated": 272687,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5689152,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "342246.457674.",
							"hitType": 1,
							"amount": 1550975,
							"mitigated": 272686,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5705109,
							"type": "damage",
							"sourceID": 48,
							"targetID": 3,
							"abilityGameID": 447439,
							"fight": 2,
							"buffs": "457674.",
							"hitType": 1,
							"amount": 2247677,
							"mitigated": 487815,
							"unmitigatedAmount": 2735492,
							"isAoE": false,
							"tick": true,
							"sourceMarker": 5
						},
						{
							"timestamp": 5705611,
							"type": "damage",
							"sourceID": 48,
							"targetID": 3,
							"abilityGameID": 447439,
							"fight": 2,
							"buffs": "457674.",
							"hitType": 1,
							"amount": 2247600,
							"mitigated": 487892,
							"unmitigatedAmount": 2735492,
							"isAoE": false,
							"tick": true,
							"sourceMarker": 5
						},
						{
							"timestamp": 5706106,
							"type": "damage",
							"sourceID": 48,
							"targetID": 3,
							"abilityGameID": 447439,
							"fight": 2,
							"buffs": "457674.",
							"hitType": 1,
							"amount": 2247524,
							"mitigated": 487968,
							"unmitigatedAmount": 2735492,
							"isAoE": false,
							"tick": true,
							"sourceMarker": 5
						},
						{
							"timestamp": 5718764,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "235313.457674.",
							"hitType": 1,
							"amount": 0,
							"mitigated": 352489,
							"unmitigatedAmount": 1823661,
							"absorbed": 1471172,
							"isAoE": false,
							"sourceMarker": 6
						},
						{
							"timestamp": 5719775,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "235313.457674.",
							"hitType": 1,
							"amount": 0,
							"mitigated": 352489,
							"unmitigatedAmount": 1823661,
							"absorbed": 1471172,
							"isAoE": false,
							"sourceMarker": 6
						},
						{
							"timestamp": 5720759,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "235313.457674.",
							"hitType": 1,
							"amount": 879065,
							"mitigated": 352489,
							"unmitigatedAmount": 1823661,
							"absorbed": 592107,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5721758,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "449331.457674.",
							"hitType": 1,
							"amount": 1551101,
							"mitigated": 272560,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5722758,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "449331.457674.",
							"hitType": 1,
							"amount": 1551101,
							"mitigated": 272560,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5723758,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "449331.457674.",
							"hitType": 1,
							"amount": 1551102,
							"mitigated": 272559,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5724752,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "449331.457674.",
							"hitType": 1,
							"amount": 1551102,
							"mitigated": 272559,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5725755,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "449331.457674.",
							"hitType": 1,
							"amount": 1551102,
							"mitigated": 272559,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						},
						{
							"timestamp": 5726766,
							"type": "damage",
							"sourceID": 50,
							"targetID": 3,
							"abilityGameID": 424432,
							"fight": 2,
							"buffs": "457674.",
							"hitType": 1,
							"amount": 1551101,
							"mitigated": 272560,
							"unmitigatedAmount": 1823661,
							"isAoE": true,
							"sourceMarker": 6
						}
					],
            "name": "Milkmage",
            "id": 3,
            "guid": 111601875,
            "type": "Mage",
            "data": [
                [
                    5579967,
                    100
                ],
                [
                    5591012,
                    94
                ],
                [
                    5591026,
                    96
                ],
                [
                    5591111,
                    100
                ],
                [
                    5591513,
                    75
                ],
                [
                    5591608,
                    76
                ],
                [
                    5591608,
                    78
                ],
                [
                    5591802,
                    81
                ],
                [
                    5591814,
                    82
                ],
                [
                    5591993,
                    88
                ],
                [
                    5592004,
                    76
                ],
                [
                    5592176,
                    77
                ],
                [
                    5592203,
                    78
                ],
                [
                    5592220,
                    79
                ],
                [
                    5592513,
                    82
                ],
                [
                    5592703,
                    86
                ],
                [
                    5592703,
                    87
                ],
                [
                    5592770,
                    90
                ],
                [
                    5593365,
                    91
                ],
                [
                    5593365,
                    92
                ],
                [
                    5593382,
                    93
                ],
                [
                    5593573,
                    95
                ],
                [
                    5593584,
                    96
                ],
                [
                    5593665,
                    100
                ],
                [
                    5605868,
                    86
                ],
                [
                    5606040,
                    100
                ],
                [
                    5606871,
                    86
                ],
                [
                    5607105,
                    87
                ],
                [
                    5607255,
                    90
                ],
                [
                    5607437,
                    91
                ],
                [
                    5607875,
                    77
                ],
                [
                    5608218,
                    82
                ],
                [
                    5608354,
                    83
                ],
                [
                    5608661,
                    84
                ],
                [
                    5608862,
                    70
                ],
                [
                    5609265,
                    80
                ],
                [
                    5609515,
                    81
                ],
                [
                    5609864,
                    67
                ],
                [
                    5610075,
                    68
                ],
                [
                    5610322,
                    69
                ],
                [
                    5610322,
                    74
                ],
                [
                    5610726,
                    75
                ],
                [
                    5610769,
                    76
                ],
                [
                    5610872,
                    62
                ],
                [
                    5611371,
                    64
                ],
                [
                    5611380,
                    65
                ],
                [
                    5611381,
                    66
                ],
                [
                    5611450,
                    67
                ],
                [
                    5611473,
                    68
                ],
                [
                    5611485,
                    70
                ],
                [
                    5611563,
                    76
                ],
                [
                    5611851,
                    78
                ],
                [
                    5611870,
                    64
                ],
                [
                    5611954,
                    65
                ],
                [
                    5612124,
                    70
                ],
                [
                    5612173,
                    71
                ],
                [
                    5612406,
                    73
                ],
                [
                    5612425,
                    78
                ],
                [
                    5612440,
                    79
                ],
                [
                    5612565,
                    80
                ],
                [
                    5612691,
                    82
                ],
                [
                    5612861,
                    83
                ],
                [
                    5612889,
                    68
                ],
                [
                    5612897,
                    69
                ],
                [
                    5612974,
                    72
                ],
                [
                    5613492,
                    73
                ],
                [
                    5613587,
                    74
                ],
                [
                    5613870,
                    60
                ],
                [
                    5613984,
                    73
                ],
                [
                    5614261,
                    74
                ],
                [
                    5614280,
                    76
                ],
                [
                    5614373,
                    77
                ],
                [
                    5614549,
                    78
                ],
                [
                    5614956,
                    83
                ],
                [
                    5614985,
                    86
                ],
                [
                    5615572,
                    87
                ],
                [
                    5615627,
                    88
                ],
                [
                    5615699,
                    89
                ],
                [
                    5615903,
                    95
                ],
                [
                    5616389,
                    96
                ],
                [
                    5616657,
                    100
                ],
                [
                    5644409,
                    88
                ],
                [
                    5644492,
                    74
                ],
                [
                    5644512,
                    81
                ],
                [
                    5644602,
                    84
                ],
                [
                    5644602,
                    85
                ],
                [
                    5644603,
                    86
                ],
                [
                    5644705,
                    89
                ],
                [
                    5644985,
                    92
                ],
                [
                    5645274,
                    95
                ],
                [
                    5645484,
                    89
                ],
                [
                    5645561,
                    92
                ],
                [
                    5645659,
                    93
                ],
                [
                    5645716,
                    94
                ],
                [
                    5645844,
                    96
                ],
                [
                    5646029,
                    97
                ],
                [
                    5646125,
                    100
                ],
                [
                    5646492,
                    94
                ],
                [
                    5646731,
                    97
                ],
                [
                    5646749,
                    98
                ],
                [
                    5646914,
                    100
                ],
                [
                    5647478,
                    94
                ],
                [
                    5647784,
                    95
                ],
                [
                    5647796,
                    100
                ],
                [
                    5648484,
                    94
                ],
                [
                    5648501,
                    95
                ],
                [
                    5648544,
                    96
                ],
                [
                    5648868,
                    100
                ],
                [
                    5649485,
                    85
                ],
                [
                    5649568,
                    86
                ],
                [
                    5649882,
                    93
                ],
                [
                    5649908,
                    94
                ],
                [
                    5649956,
                    95
                ],
                [
                    5650255,
                    96
                ],
                [
                    5650406,
                    98
                ],
                [
                    5650480,
                    83
                ],
                [
                    5650615,
                    84
                ],
                [
                    5650949,
                    90
                ],
                [
                    5650973,
                    91
                ],
                [
                    5651013,
                    70
                ],
                [
                    5651062,
                    50
                ],
                [
                    5651157,
                    1
                ],
                [
                    5651346,
                    5
                ],
                [
                    5651383,
                    40
                ],
                [
                    5651492,
                    85
                ],
                [
                    5651630,
                    87
                ],
                [
                    5651669,
                    88
                ],
                [
                    5652037,
                    89
                ],
                [
                    5652081,
                    90
                ],
                [
                    5652102,
                    92
                ],
                [
                    5652523,
                    95
                ],
                [
                    5652568,
                    99
                ],
                [
                    5652742,
                    100
                ],
                [
                    5657111,
                    97
                ],
                [
                    5657315,
                    98
                ],
                [
                    5657345,
                    99
                ],
                [
                    5657395,
                    100
                ],
                [
                    5681150,
                    85
                ],
                [
                    5681165,
                    86
                ],
                [
                    5681437,
                    87
                ],
                [
                    5681912,
                    90
                ],
                [
                    5682006,
                    94
                ],
                [
                    5682384,
                    95
                ],
                [
                    5682487,
                    96
                ],
                [
                    5682868,
                    100
                ],
                [
                    5683150,
                    88
                ],
                [
                    5683182,
                    91
                ],
                [
                    5683204,
                    94
                ],
                [
                    5683325,
                    95
                ],
                [
                    5683480,
                    98
                ],
                [
                    5683550,
                    99
                ],
                [
                    5683581,
                    100
                ],
                [
                    5684138,
                    82
                ],
                [
                    5684331,
                    88
                ],
                [
                    5684625,
                    89
                ],
                [
                    5684626,
                    94
                ],
                [
                    5684729,
                    96
                ],
                [
                    5685141,
                    78
                ],
                [
                    5685446,
                    80
                ],
                [
                    5685473,
                    81
                ],
                [
                    5685578,
                    96
                ],
                [
                    5685680,
                    97
                ],
                [
                    5686003,
                    98
                ],
                [
                    5686146,
                    79
                ],
                [
                    5686146,
                    82
                ],
                [
                    5686530,
                    89
                ],
                [
                    5686739,
                    91
                ],
                [
                    5686856,
                    92
                ],
                [
                    5687143,
                    74
                ],
                [
                    5687208,
                    75
                ],
                [
                    5687550,
                    82
                ],
                [
                    5687550,
                    83
                ],
                [
                    5687791,
                    84
                ],
                [
                    5687988,
                    85
                ],
                [
                    5688137,
                    67
                ],
                [
                    5688234,
                    68
                ],
                [
                    5688295,
                    69
                ],
                [
                    5688425,
                    70
                ],
                [
                    5688503,
                    76
                ],
                [
                    5688860,
                    77
                ],
                [
                    5688951,
                    79
                ],
                [
                    5689152,
                    61
                ],
                [
                    5689473,
                    73
                ],
                [
                    5689486,
                    74
                ],
                [
                    5689579,
                    77
                ],
                [
                    5689636,
                    80
                ],
                [
                    5689656,
                    82
                ],
                [
                    5689926,
                    84
                ],
                [
                    5690113,
                    87
                ],
                [
                    5690359,
                    89
                ],
                [
                    5690593,
                    91
                ],
                [
                    5690798,
                    92
                ],
                [
                    5690966,
                    95
                ],
                [
                    5690977,
                    96
                ],
                [
                    5691072,
                    97
                ],
                [
                    5691092,
                    100
                ],
                [
                    5705109,
                    74
                ],
                [
                    5705611,
                    48
                ],
                [
                    5706106,
                    21
                ],
                [
                    5706624,
                    22
                ],
                [
                    5707010,
                    32
                ],
                [
                    5707396,
                    33
                ],
                [
                    5707840,
                    34
                ],
                [
                    5707863,
                    35
                ],
                [
                    5707939,
                    47
                ],
                [
                    5708073,
                    48
                ],
                [
                    5708778,
                    49
                ],
                [
                    5708936,
                    62
                ],
                [
                    5709240,
                    63
                ],
                [
                    5709469,
                    64
                ],
                [
                    5710174,
                    66
                ],
                [
                    5710289,
                    67
                ],
                [
                    5710418,
                    71
                ],
                [
                    5710418,
                    75
                ],
                [
                    5711468,
                    76
                ],
                [
                    5712349,
                    77
                ],
                [
                    5712509,
                    78
                ],
                [
                    5712666,
                    79
                ],
                [
                    5712688,
                    80
                ],
                [
                    5712964,
                    81
                ],
                [
                    5713433,
                    82
                ],
                [
                    5713716,
                    83
                ],
                [
                    5713900,
                    84
                ],
                [
                    5714075,
                    85
                ],
                [
                    5714991,
                    87
                ],
                [
                    5715125,
                    88
                ],
                [
                    5715473,
                    89
                ],
                [
                    5716333,
                    90
                ],
                [
                    5716771,
                    96
                ],
                [
                    5716771,
                    97
                ],
                [
                    5717135,
                    100
                ],
                [
                    5720759,
                    90
                ],
                [
                    5720777,
                    93
                ],
                [
                    5720927,
                    95
                ],
                [
                    5721032,
                    96
                ],
                [
                    5721047,
                    100
                ],
                [
                    5721758,
                    82
                ],
                [
                    5721998,
                    83
                ],
                [
                    5722271,
                    100
                ],
                [
                    5722758,
                    82
                ],
                [
                    5722993,
                    83
                ],
                [
                    5723040,
                    84
                ],
                [
                    5723219,
                    92
                ],
                [
                    5723360,
                    93
                ],
                [
                    5723419,
                    94
                ],
                [
                    5723681,
                    95
                ],
                [
                    5723758,
                    77
                ],
                [
                    5723785,
                    78
                ],
                [
                    5724133,
                    85
                ],
                [
                    5724374,
                    86
                ],
                [
                    5724752,
                    68
                ],
                [
                    5724806,
                    69
                ],
                [
                    5724833,
                    70
                ],
                [
                    5725065,
                    71
                ],
                [
                    5725079,
                    78
                ],
                [
                    5725111,
                    79
                ],
                [
                    5725426,
                    81
                ],
                [
                    5725744,
                    83
                ],
                [
                    5725755,
                    65
                ],
                [
                    5726020,
                    72
                ],
                [
                    5726047,
                    73
                ],
                [
                    5726114,
                    77
                ],
                [
                    5726151,
                    78
                ],
                [
                    5726152,
                    81
                ],
                [
                    5726420,
                    83
                ],
                [
                    5726608,
                    86
                ],
                [
                    5726766,
                    67
                ],
                [
                    5727063,
                    70
                ],
                [
                    5727125,
                    73
                ],
                [
                    5727185,
                    74
                ],
                [
                    5727490,
                    75
                ],
                [
                    5727521,
                    77
                ],
                [
                    5727560,
                    78
                ],
                [
                    5727804,
                    80
                ],
                [
                    5728207,
                    83
                ],
                [
                    5728216,
                    84
                ],
                [
                    5728444,
                    100
                ],
                [
                    5730661,
                    100
                ]
            ],
            "events": [
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                [],
                []
            ],
            "currentValues": [
                8551520,
                8067608,
                8176222,
                8551520,
                6410636,
                6521120,
                6704295,
                6890202,
                6982968,
                7486838,
                6501000,
                6575032,
                6687470,
                6724486,
                6987144,
                7358958,
                7452869,
                7674112,
                7784496,
                7893117,
                7930204,
                8115920,
                8208393,
                8551520,
                7332914,
                8551520,
                7332914,
                7409060,
                7691974,
                7765396,
                6546790,
                6983605,
                7102415,
                7185024,
                5960260,
                6819858,
                6929428,
                5735603,
                5817056,
                5880787,
                6319375,
                6378230,
                6493438,
                5268674,
                5492287,
                5576950,
                5626810,
                5717952,
                5775605,
                6024955,
                6472366,
                6696914,
                5472150,
                5529935,
                5973223,
                6048121,
                6274816,
                6647786,
                6732823,
                6807080,
                7031436,
                7072278,
                5825408,
                5913665,
                6135807,
                6261646,
                6352766,
                5105600,
                6222195,
                6303878,
                6488951,
                6573243,
                6656031,
                7135022,
                7323202,
                7405797,
                7490793,
                7622711,
                8093180,
                8187128,
                8551520,
                7540017,
                6299136,
                6903548,
                7211724,
                7294134,
                7331412,
                7569002,
                7872934,
                8100863,
                7604510,
                7827542,
                7966458,
                8007463,
                8229471,
                8314309,
                8541721,
                8055167,
                8270512,
                8359959,
                8551520,
                8055168,
                8129701,
                8551520,
                8055168,
                8128188,
                8175344,
                8551520,
                7310639,
                7389152,
                7926479,
                7997797,
                8086079,
                8169839,
                8352826,
                7111945,
                7176997,
                7654761,
                7753652,
                7841977,
                8127580,
                8322885,
                8400683,
                8494243,
                7253362,
                7455500,
                7498027,
                7616874,
                7704009,
                7900436,
                8110872,
                8468511,
                8551520,
                8299417,
                8386346,
                8437706,
                8551520,
                7286884,
                7322419,
                7434162,
                7738951,
                8016099,
                8087970,
                8180818,
                8551520,
                7518949,
                7796097,
                8051034,
                8129344,
                8383844,
                8478881,
                8509479,
                7000418,
                7492223,
                7583362,
                8072753,
                8186772,
                6656850,
                6810385,
                6901173,
                8215967,
                8310535,
                8339468,
                6788366,
                7020203,
                7607336,
                7741765,
                7852652,
                6346945,
                6382316,
                6971375,
                7086648,
                7180874,
                7263409,
                5712435,
                5827768,
                5873162,
                5990342,
                6531887,
                6624608,
                6737764,
                5186789,
                6203464,
                6324045,
                6599985,
                6829147,
                6989296,
                7217387,
                7446075,
                7570883,
                7796790,
                7837878,
                8116030,
                8207628,
                8327802,
                8551520,
                6303843,
                4076827,
                1829303,
                1879895,
                2739680,
                2815575,
                2947187,
                2982492,
                4033313,
                4112154,
                4189868,
                5272391,
                5369119,
                5445288,
                5640607,
                5705202,
                6051197,
                6397192,
                6486046,
                6575130,
                6699010,
                6763980,
                6798711,
                6921374,
                7033940,
                7063787,
                7178353,
                7276823,
                7476831,
                7511156,
                7585977,
                7690406,
                8221521,
                8287740,
                8551520,
                7672455,
                7975342,
                8086655,
                8221626,
                8535414,
                7000419,
                7078225,
                8526133,
                7000419,
                7122292,
                7197589,
                7849941,
                7949040,
                7999050,
                8141570,
                6590468,
                6638304,
                7267669,
                7374146,
                5823044,
                5910018,
                5998327,
                6105301,
                6668879,
                6737892,
                6958075,
                7069437,
                5518335,
                6135382,
                6278677,
                6570733,
                6708769,
                6908550,
                7067816,
                7320256,
                5769155,
                5969576,
                6222449,
                6289262,
                6403446,
                6606468,
                6693442,
                6829123,
                7091257,
                7160463,
                8551520,
                8551520
            ],
            "maxValues": [
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520,
                8551520
            ]
        }
    ],
    "startTime": 5577360,
    "endTime": 5731105,
};