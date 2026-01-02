// src/config/config.d.ts

declare module "@/config/config.json" {
  interface Hello {
    image?: string;
    video?: string;
    message?: string[];
  }

  interface PersonName {
    firstName: string;
    lastName: string;
  }

  interface HostPerson {
    name: PersonName;
    en: PersonName;
    account: {
      name: string;
      bank: string;
      number: string;
      kakao?: string;
    }[];
    father: PersonName;
    mother: PersonName;
    sibling: string;
  }

  interface Config {
    framing: {
      prelude: Hello;
      finale: Hello;
    };
    weddingDay: {
      year: number;
      month: number;
      day: number;
      hour: number;
      minute: number;
    };
    host: {
      groom: HostPerson;
      bride: HostPerson;
    };
    location: {
      name: string;
      city: string;
      hall: string;
      detail: {
        coordinate: {
          base: [number, number];
          references: {
            [key: string]: [number, number];
          };
        };
        transfortation: {
          car: {
            address: string[];
          };
          subway?: {
            lines: string[];
            desc: string[];
          };
          bus?: {
            lines: {
              number: number | string;
              color: string;
            }[];
            desc: string;
          }[];
        };
      };
    };
  }

  const value: Config;
  export default value;
}
