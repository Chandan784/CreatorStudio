const Icons = ({ icon, className }) => {
    const ICONS_LIST = {
        menuToggel: (
            <svg
                className="cursor-pointer"
                width="26"
                height="20"
                viewBox="0 0 26 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M4 17.5V15H22V17.5H4ZM4 11.25V8.75H22V11.25H4ZM4 5V2.5H22V5H4Z"
                    fill="white"
                />
            </svg>
        ),
        circleCross: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" width="30" height="30" viewBox="0 0 24 24">
                <path fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" d="M20 20L4 4m16 0L4 20" />
            </svg>
        ),
        instagram: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="#fff">
                    <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
                    <path d="M16.5 12a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m1.008-5.5h-.01" />
                </g>
            </svg>
        ),
        facebook: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#fff" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" />
            </svg>
        ),
        twitter: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path fill="#fff" d="M4.594 4.984a1 1 0 0 1 .941.429C7.011 7.572 8.783 8.47 10.75 8.674c.096-.841.323-1.672.75-2.404c.626-1.074 1.644-1.864 3.098-2.156c2.01-.404 3.54.324 4.427 1.215l1.792-.335a1 1 0 0 1 1.053 1.478l-1.72 3.022c.157 4.361-1.055 7.405-3.639 9.502c-1.37 1.112-3.332 1.743-5.485 1.938c-2.17.196-4.623-.041-7.061-.753a1 1 0 0 1 .007-1.922c1.226-.349 2.16-.65 3.003-1.177c-1.199-.636-2.082-1.468-2.707-2.416c-.868-1.318-1.19-2.788-1.254-4.113S3.141 8 3.343 7.115c.115-.505.249-1.011.434-1.495a1 1 0 0 1 .818-.636Z" />
                </g>
            </svg>
        ),
        youtube: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path fill="#fff" d="M12 4c.855 0 1.732.022 2.582.058l1.004.048l.961.057l.9.061l.822.064a3.8 3.8 0 0 1 3.494 3.423l.04.425l.075.91c.07.943.122 1.971.122 2.954s-.052 2.011-.122 2.954l-.075.91l-.04.425a3.8 3.8 0 0 1-3.495 3.423l-.82.063l-.9.062l-.962.057l-1.004.048A62 62 0 0 1 12 20a62 62 0 0 1-2.582-.058l-1.004-.048l-.961-.057l-.9-.062l-.822-.063a3.8 3.8 0 0 1-3.494-3.423l-.04-.425l-.075-.91A41 41 0 0 1 2 12c0-.983.052-2.011.122-2.954l.075-.91l.04-.425A3.8 3.8 0 0 1 5.73 4.288l.821-.064l.9-.061l.962-.057l1.004-.048A62 62 0 0 1 12 4m-2 5.575v4.85c0 .462.5.75.9.52l4.2-2.425a.6.6 0 0 0 0-1.04l-4.2-2.424a.6.6 0 0 0-.9.52Z" />
                </g>
            </svg>
        ),
        email: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="#0c6df1" fillRule="evenodd" d="M3.01 5.838a1 1 0 0 1 1-1H20a1 1 0 0 1 1 1v11.324a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-11q0-.072.01-.14zM5 8.062v9.1h14v-9.1l-4.879 4.879a3 3 0 0 1-4.242 0zm1.572-1.256h10.856l-4.72 4.72a1 1 0 0 1-1.415 0z" clipRule="evenodd" />
            </svg>
        ),
        phonecall: (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path fill="#17f10c" d="M16.552 22.133c-1.44-.053-5.521-.617-9.795-4.89c-4.273-4.274-4.836-8.354-4.89-9.795c-.08-2.196 1.602-4.329 3.545-5.162a1.47 1.47 0 0 1 1.445.159c1.6 1.166 2.704 2.93 3.652 4.317a1.504 1.504 0 0 1-.256 1.986l-1.951 1.449a.48.48 0 0 0-.142.616c.442.803 1.228 1.999 2.128 2.899s2.153 1.738 3.012 2.23a.483.483 0 0 0 .644-.162l1.27-1.933a1.503 1.503 0 0 1 2.056-.332c1.407.974 3.049 2.059 4.251 3.598a1.47 1.47 0 0 1 .189 1.485c-.837 1.953-2.955 3.616-5.158 3.535" />
                </g>
            </svg>
        ),
        errorUser: (
            <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none" stroke="#e61e1e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path strokeDasharray="20" strokeDashoffset="20" d="M5 21v-1c0 -2.21 1.79 -4 4 -4h4c2.21 0 4 1.79 4 4v1">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="20;0" />
                    </path>
                    <path strokeDasharray="20" strokeDashoffset="20" d="M11 13c-1.66 0 -3 -1.34 -3 -3c0 -1.66 1.34 -3 3 -3c1.66 0 3 1.34 3 3c0 1.66 -1.34 3 -3 3Z">
                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="20;0" />
                    </path>
                    <path strokeDasharray="6" strokeDashoffset="6" d="M20 3v4">
                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="6;0" />
                        <animate attributeName="stroke-width" begin="1s" dur="3s" keyTimes="0;0.1;0.2;0.3;1" repeatCount="indefinite" values="2;3;3;2;2" />
                    </path>
                    <path strokeDasharray="2" strokeDashoffset="2" d="M20 11v0.01">
                        <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="2;0" />
                        <animate attributeName="stroke-width" begin="1.3s" dur="3s" keyTimes="0;0.1;0.2;0.3;1" repeatCount="indefinite" values="2;3;3;2;2" />
                    </path>
                </g>
            </svg>
        ),


    };
    return icon && ICONS_LIST[icon];
};

export default Icons;