import { bannedBossSkills } from "../../global/variable/mplusVariable";

const MplusSkillCheckComponent = ({
    className, bossSkillInfo, playerSkillInfo, takenBuffInfo, firstBossIDs, selectedBossSkill
    , handleSelectSkill, selectedSkill, takenBloodlusts, handleSelectBloodlust
}) => {

    return (
        <div className='mb-4 md:flex'>
            {/* 보스 스킬 표기 on/off */}
            <div className='flex items-center md:mr-3'>
                <div className='w-[40px] h-[40px] mr-1 border-2 border-black'>
                    <img className='min-w-[36px]'
                        src={`${process.env.REACT_APP_IMAGES_IP}/images/common/mark/tyrannical.jpg`}
                    />
                </div>
                {bossSkillInfo
                    ?.filter(s => !bannedBossSkills?.includes(s))
                    ?.filter(s => firstBossIDs?.includes(s))?.map((skill, i) => (
                        <a
                            href="#" data-wowhead={`spell=${skill}&domain=ko`}
                            key={skill + 'bossSkillCheck'}
                            className={`w-[30px] h-[30px] hover:bg-slate-200 cursor-pointer
                                        ${selectedBossSkill.has(skill) ? 'border-[1px] border-gray-900 rounded-sm' : 'opacity-40'}`}
                            onClick={() => handleSelectSkill(skill, 'boss')}
                        >
                            <img
                                src={`${process.env.REACT_APP_IMAGES_IP}/images/mplus/boss/spell/${skill}.jpg`}
                                className="min-w-[28px]"
                            />
                        </a>
                    ))}
            </div>
            {/* 플레이어 스킬 표기 on/off */}
            <div className='flex items-center md:mr-3'>
                <div className='w-[40px] h-[40px] mr-1 border-2 border-black'>
                    <img
                        src={`${process.env.REACT_APP_IMAGES_IP}/images/player/spec/${className}.jpg`}
                        className="min-w-[36px]"
                    />
                </div>
                {playerSkillInfo?.map((skill, i) => (
                    <a
                        href="#" data-wowhead={`spell=${skill?.spellId}&domain=ko`}
                        key={skill?.spellId + 'playerSkillCheck'}
                        className={`w-[30px] h-[30px] hover:bg-slate-200 cursor-pointer
                                        ${selectedSkill?.has(skill?.spellId) ? 'border-[1px] border-gray-900 rounded-sm' : 'opacity-40'}`}
                        onClick={() => handleSelectSkill(skill?.spellId, 'player')}
                    >
                        <img
                            src={`${process.env.REACT_APP_IMAGES_IP}/images/ability/${skill?.spellId}.jpg`}
                            className="min-w-[28px]"
                        />
                    </a>
                ))}
            </div>
            {/* 외생기 스킬 표기 on/off */}
            <div className='flex items-center'>
                <div className='w-[40px] h-[40px] mr-1 border-2 border-black'>
                    <img
                        src={`${process.env.REACT_APP_IMAGES_IP}/images/player/spell/10060.jpg`}
                        className="min-w-[36px]"
                    />
                </div>
                {takenBuffInfo?.map((skill, i) => (
                    <a
                        href="#" data-wowhead={`spell=${skill?.spellId}&domain=ko`}
                        key={skill?.spellId + 'takenBuffCheck'}
                        className={`w-[30px] h-[30px] hover:bg-slate-200 cursor-pointer
                                        ${selectedSkill?.has(skill?.spellId) ? 'border-[1px] border-gray-900 rounded-sm' : 'opacity-40'}`}
                        onClick={() => handleSelectSkill(skill?.spellId, 'player')}
                    >
                        <img
                            src={`${process.env.REACT_APP_IMAGES_IP}/images/ability/${skill?.spellId}.jpg`}
                            className="min-w-[28px]"
                        />
                    </a>
                ))}
                {takenBloodlusts?.length > 1 && (
                    <a
                        href="#" data-wowhead={`spell=2825&domain=ko`}
                        className={`w-[30px] h-[30px] hover:bg-slate-200 cursor-pointer
                                ${takenBloodlusts?.
                                every(spell => selectedSkill?.
                                    has(spell.spellId))
                                ? 'border-[1px] border-gray-900 rounded-sm' : 'opacity-40'}`}
                        onClick={handleSelectBloodlust}
                    >
                        <img
                            src={`${process.env.REACT_APP_IMAGES_IP}/images/ability/2825.jpg`}
                            className="min-w-[28px]"
                        />
                    </a>
                )}
            </div>
        </div>
    );
}

export default MplusSkillCheckComponent;