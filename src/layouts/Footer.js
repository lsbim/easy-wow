import { FOOTER_HEIGHT } from "../global/variable/variable";

const Footer = () => {
    return (
        <div className={`w-full px-2 mt-auto`} style={{ height: `${FOOTER_HEIGHT}px` }}>
            <small className="block md:text-[12px] text-[10px]">
                Timeline data is retrieved from <a href="https://www.warcraftlogs.com" target="_blank" className="font-bold">Warcraft Logs. </a>
                Item and ability tooltips by <a href="https://www.wowhead.com" target="_blank" className="font-bold">Wowhead</a>.
                <br />
                All images copyright Blizzard Entertainment. World of Warcraft Warcraft and Blizzard Entertainment are trademarks or registered trademarks of Blizzard Entertainment, Inc. in the U.S. and/or other countries.
            </small>
        </div>
    );
}

export default Footer;