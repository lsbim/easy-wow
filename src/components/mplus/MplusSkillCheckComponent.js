import { bannedBossSkills } from "../../global/variable/mplusVariable";

const MplusSkillCheckComponent = ({
    className, bossSkillInfo, playerSkillInfo, takenBuffInfo
    , firstBossIDs, selectedBossSkill, handleSelectSkill, selectedSkill
}) => {
    
    return (
        <div className='mb-4 md:flex'>
            {/* 보스 스킬 표기 on/off */}
            <div className='flex items-center md:mr-3'>
                <div className='w-[40px] h-[40px] mr-1 border-2 border-black'>
                    <img className='w-[40px] h-[40px]'
                        src={`${process.env.PUBLIC_URL}/images/common/mark/tyrannical.jpg`}
                    />
                </div>
                {bossSkillInfo
                    ?.filter(s => !bannedBossSkills?.includes(s))
                    ?.filter(s => firstBossIDs?.includes(s))?.map((skill, i) => (
                        <a
                            href="#" data-wowhead={`spell=${skill}&domain=ko`}
                            key={'bossSkillInfo' + skill}
                            className={`w-[30px] h-[30px] hover:bg-slate-200 cursor-pointer
                                        ${selectedBossSkill.has(skill) ? 'border-[1px] border-gray-900 rounded-sm' : 'opacity-40'}`}
                            onClick={() => handleSelectSkill(skill, 'boss')}
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/images/mplus/boss/spell/${skill}.jpg`}
                            />
                        </a>
                    ))}
            </div>
            {/* 플레이어 스킬 표기 on/off */}
            <div className='flex items-center md:mr-3'>
                <div className='w-[40px] h-[40px] mr-1 border-2 border-black'>
                    <img
                        src={`${process.env.PUBLIC_URL}/images/player/spec/${className}.jpg`}
                    />
                </div>
                {playerSkillInfo?.map((skill, i) => (
                    <a
                        href="#" data-wowhead={`spell=${skill?.spellId}&domain=ko`}
                        key={skill?.skillName}
                        className={`w-[30px] h-[30px] hover:bg-slate-200 cursor-pointer
                                        ${selectedSkill?.has(skill?.spellId) ? 'border-[1px] border-gray-900 rounded-sm' : 'opacity-40'}`}
                        onClick={() => handleSelectSkill(skill?.spellId, 'player')}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/images/player/spell/${skill?.spellId}.jpg`}
                        />
                    </a>
                ))}
            </div>
            {/* 외생기 스킬 표기 on/off */}
            <div className='flex items-center'>
                <div className='w-[40px] h-[40px] mr-1 border-2 border-black'>
                    <img
                        src={`${process.env.PUBLIC_URL}/images/player/spell/10060.jpg`}
                    />
                </div>
                {takenBuffInfo?.map((skill, i) => (
                    <a
                        href="#" data-wowhead={`spell=${skill?.spellId}&domain=ko`}
                        key={skill?.spellId + 'takenBuff'}
                        className={`w-[30px] h-[30px] hover:bg-slate-200 cursor-pointer
                                        ${selectedSkill?.has(skill?.spellId) ? 'border-[1px] border-gray-900 rounded-sm' : 'opacity-40'}`}
                        onClick={() => handleSelectSkill(skill?.spellId, 'player')}
                    >
                        <img
                            src={`${process.env.PUBLIC_URL}/images/player/spell/${skill?.spellId}.jpg`}
                        />
                    </a>
                ))}
            </div>
        </div>
    );
}

export default MplusSkillCheckComponent;