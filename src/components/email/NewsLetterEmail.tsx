import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";
import { RiLinkedinBoxFill, RiGithubFill, RiInstagramFill } from "react-icons/ri"

export default function NewsLetterEmail({ name, email, phone }: {name: string, email: string, phone: string}) {
    return (
        <Tailwind
            config={{
                theme: {
                    extend: {
                        screens: {
                            xxs: '325px',
                        },
                        fontSize: {
                            xxs: '0.55rem',
                            s: "0.65rem",
                        },
                        boxShadow: {
                            '3xl': '0 -2px 5px 4px rgba(148,148,148,148.014)',
                        },
                        keyframes: {
                            wiggle: {
                                '0%, 100%': { transform: 'rotate(-9deg)' },
                                '50%': { transform: 'rotate(9deg)' },
                            },
                        },
                        animation: {
                            wiggle: 'wiggle 1s ease-in-out infinite',
                            'wiggle-slow': 'wiggle 2s linear infinite',
                            'ping-slow': 'ping 1s linear infinite',
                            'ping-slower': 'ping 2s linear infinite',
                            'spin-slow': 'spin 2s linear infinite',
                            'spin-slower': 'spin 3s linear infinite',
                            'bounce-slow': 'bounce 3s linear infinite',
                        },
                        colors: {
                            primary: "#F6913F",
                            secondary: "#393A47",
                            'bg-dark': "#131424",
                            accent: '#2BF124',
                            light: "#fefffe",
                            dark: "#494949"
                        },
                    },
                },
            }}
        >
            <Html className="bg-dark/20 text-dark text-sm h-screen w-screen flex flex-col items-center justify-center">
                <Head>
                    <title>Thank you {name}</title>
                </Head>
                <Preview className="capitalize font-semibold">You message has been recived.</Preview>

                <Hr />

                <Body className="bg-white rounded-lg shadow px-4 py-8 my-auto mx-auto font-sans max-w-lg">

                    <Text>
                        Hello {name},
                    </Text>
                    <Text className="text-base pt-4">
                        Please be informed that your message was sent successfully.
                    </Text>
                    <Text>
                        However I would like your consent to add you to my mailing list to update you with my latest products and services
                    </Text>
                    <Text>
                        Please Click the link below to approve this.
                    </Text>

                    <Button
                        className="mb-4 py-2 px-6 bg-primary text-bg-dark hover:scale-105 rounded-lg"
                        href={`https://jeremiahedavid.online/approve/${email}/${name}/${phone}`}
                    >
                        Please Approve
                    </Button>


                    <Section className="bg-dark/20 p-6 rounded-lg text-bg-dark flex flex-row items-center justify-between gap-y-4 ">
                        <Section>
                            <Text className="block font-semibold">
                                Social Links
                            </Text>
                            <Text className="flex items-center gap-x-4">
                                <Link className="text-xl text-dark hover:text-primary duration-300 ease-linear" href="https://linkedin.com/in/jeremiahedavid/">
                                    <RiLinkedinBoxFill />
                                </Link>
                                <Link className="text-xl text-dark hover:text-primary duration-300 ease-linear" href="https://github.com/david-jerry">
                                    <RiGithubFill />
                                </Link>
                                <Link className="text-xl text-dark hover:text-primary duration-300 ease-linear" href="https://www.instagram.com/mst_daveed/">
                                    <RiInstagramFill />
                                </Link>
                            </Text>
                        </Section>
                        <Section>
                            <Text className="text-xs">
                                Thank you for connecting.
                            </Text>
                        </Section>
                    </Section>
                </Body>
            </Html>
        </Tailwind>
    );
}