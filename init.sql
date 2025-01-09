--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8 (Debian 15.8-1.pgdg120+1)
-- Dumped by pg_dump version 15.8 (Debian 15.8-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- Name: city; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.city (
    id integer NOT NULL,
    city character varying NOT NULL
);


ALTER TABLE public.city OWNER TO postgres;

--
-- Name: city_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_id_seq OWNER TO postgres;

--
-- Name: city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.city_id_seq OWNED BY public.city.id;


--
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    id integer NOT NULL,
    mark integer NOT NULL,
    text character varying,
    id_from integer NOT NULL,
    id_for integer NOT NULL,
    CONSTRAINT mark_1_2_3_4_5 CHECK ((mark = ANY (ARRAY[1, 2, 3, 4, 5])))
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_id_seq OWNER TO postgres;

--
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_id_seq OWNED BY public.comment.id;


--
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    id integer NOT NULL,
    need_help boolean NOT NULL,
    created_at date DEFAULT timezone('utc'::text, now()) NOT NULL,
    text character varying NOT NULL,
    short_text character varying NOT NULL,
    photo_url character varying,
    people_count integer,
    latitude character varying NOT NULL,
    longitude character varying NOT NULL,
    id_organization integer NOT NULL,
    id_city integer,
    id_type_event integer NOT NULL
);


ALTER TABLE public.event OWNER TO postgres;

--
-- Name: event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_id_seq OWNER TO postgres;

--
-- Name: event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_id_seq OWNED BY public.event.id;


--
-- Name: organization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organization (
    id integer NOT NULL,
    email character varying NOT NULL,
    hashed_password character varying NOT NULL,
    role character varying,
    created_at date DEFAULT timezone('utc'::text, now()) NOT NULL,
    photo_url character varying,
    name_organization character varying,
    site_url character varying,
    phone_1 character varying,
    phone_2 character varying,
    about character varying,
    "FIO" character varying,
    id_city integer,
    id_type_organization integer NOT NULL,
    latitude character varying,
    longitude character varying,
    recovery_password_code character varying
);


ALTER TABLE public.organization OWNER TO postgres;

--
-- Name: organization_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organization_id_seq OWNER TO postgres;

--
-- Name: organization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organization_id_seq OWNED BY public.organization.id;


--
-- Name: theme_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.theme_event (
    id integer NOT NULL,
    theme_event character varying NOT NULL
);


ALTER TABLE public.theme_event OWNER TO postgres;

--
-- Name: theme_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.theme_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.theme_event_id_seq OWNER TO postgres;

--
-- Name: theme_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.theme_event_id_seq OWNED BY public.theme_event.id;


--
-- Name: type_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_event (
    id integer NOT NULL,
    type_event character varying NOT NULL,
    id_theme_event integer NOT NULL
);


ALTER TABLE public.type_event OWNER TO postgres;

--
-- Name: type_event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_event_id_seq OWNER TO postgres;

--
-- Name: type_event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_event_id_seq OWNED BY public.type_event.id;


--
-- Name: type_organization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type_organization (
    id integer NOT NULL,
    type_organization character varying NOT NULL
);


ALTER TABLE public.type_organization OWNER TO postgres;

--
-- Name: type_organization_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_organization_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_organization_id_seq OWNER TO postgres;

--
-- Name: type_organization_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_organization_id_seq OWNED BY public.type_organization.id;


--
-- Name: city id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city ALTER COLUMN id SET DEFAULT nextval('public.city_id_seq'::regclass);


--
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN id SET DEFAULT nextval('public.comment_id_seq'::regclass);


--
-- Name: event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event ALTER COLUMN id SET DEFAULT nextval('public.event_id_seq'::regclass);


--
-- Name: organization id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization ALTER COLUMN id SET DEFAULT nextval('public.organization_id_seq'::regclass);


--
-- Name: theme_event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.theme_event ALTER COLUMN id SET DEFAULT nextval('public.theme_event_id_seq'::regclass);


--
-- Name: type_event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_event ALTER COLUMN id SET DEFAULT nextval('public.type_event_id_seq'::regclass);


--
-- Name: type_organization id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_organization ALTER COLUMN id SET DEFAULT nextval('public.type_organization_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
ab0b0e8a7b47
\.


--
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.city (id, city) FROM stdin;
1	Москва
2	Санкт-Петербург
3	Новосибирск
4	Екатеринбург
5	Казань
6	Нижний Новгород
7	Челябинск
8	Самара
9	Ростов-на-Дону
10	Уфа
11	Красноярск
12	Воронеж
13	Пермь
14	Волгоград
15	Краснодар
\.


--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (id, mark, text, id_from, id_for) FROM stdin;
1	5	Отличная организация! Спасибо за помощь.	3	1
2	4	Все хорошо, но можно улучшить.	2	4
3	3	Помогли, но не все было идеально.	5	6
4	5	Рекомендую! Очень благодарен.	8	3
5	2	Организация не оправдала ожиданий.	4	9
6	1	Совсем не доволен взаимодействием.	7	5
7	4	Быстро среагировали на запрос.	9	2
8	5	Лучшая помощь, которую я когда-либо получал.	1	10
9	5	Волонтеры просто молодцы.	6	8
10	3	Средний опыт взаимодействия.	10	7
\.


--
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event (id, need_help, created_at, text, short_text, photo_url, people_count, latitude, longitude, id_organization, id_city, id_type_event) FROM stdin;
1000049	f	2025-01-08	Озеленение площади.	Озеленение городской площади.	https://storage.yandexcloud.net/support.rf/1000049_event_1736370430.7147744.jpg	12	54.72348941342619	55.916976928710945	10	10	10
1000050	f	2025-01-08	Чистка берега.	Чистка береговой линии.	https://storage.yandexcloud.net/support.rf/1000050_event_1736370515.767246.jpg	25	54.71255328369176	55.94358444213868	10	10	10
1000051	t	2025-01-08	Уборка улиц города.	Уборка улиц.	https://storage.yandexcloud.net/support.rf/1000051_event_1736370593.4828248.jpg	15	54.73227150367946	55.973625183105476	10	10	10
1000047	t	2025-01-08	Установка скамеек.	Установка скамеек в сквере.	https://storage.yandexcloud.net/support.rf/1000047_event_1736370682.770081.jpg	7	47.172532023473465	39.80758666992188	9	9	6
1000048	t	2025-01-08	Благоустройство.	Благоустройство дворов.	https://storage.yandexcloud.net/support.rf/1000048_event_1736370724.5164216.jpg	15	47.165252723987855	39.70458984375001	9	9	6
1000045	f	2025-01-08	Помощь приюту.	Помощь приюту для животных.	https://storage.yandexcloud.net/support.rf/1000045_event_1736370776.1404397.jpg	10	53.254687684320494	50.28167724609375	8	9	6
1000046	f	2025-01-08	Сбор продуктов.	Сбор продуктов для детского дома.	https://storage.yandexcloud.net/support.rf/1000046_event_1736370808.8355753.jpg	0	53.28023900701253	50.24871826171876	8	8	9
1000043	t	2025-01-08	Установка скамеек.	Установка скамеек в сквере.	https://storage.yandexcloud.net/support.rf/1000043_event_1736370855.7247715.jpg	7	55.14560000724946	61.35177612304688	7	7	6
1000044	f	2025-01-08	Ремонт крыши.	Ремонт крыши дома ветеранов.	https://storage.yandexcloud.net/support.rf/1000044_event_1736370886.5915499.jpg	0	55.18850935787742	61.360702514648445	7	7	6
1000041	f	2025-01-08	Раздача еды.	Раздача еды бездомным.	https://storage.yandexcloud.net/support.rf/1000041_event_1736370954.5101676.jpg	15	56.301908185823194	44.001617431640625	6	6	8
1000042	f	2025-01-08	Спортивный праздник.	Организация спортивного праздника.	https://storage.yandexcloud.net/support.rf/1000042_event_1736371001.244009.jpg	70	56.31638201507975	43.89175415039063	6	6	7
1000039	t	2025-01-08	Сбор средств.	Сбор средств на лечение.	https://storage.yandexcloud.net/support.rf/1000039_event_1736371059.942841.jpg	0	55.78915817738495	49.19540405273438	5	5	1
1000040	f	2025-01-08	Раздача масок.	Раздача масок и санитайзеров.	https://storage.yandexcloud.net/support.rf/1000040_event_1736371104.1651769.jpg	100	55.83260181472976	49.12261962890626	5	5	8
1000037	t	2025-01-08	Сбор средств.	Сбор средств на лечение.	https://storage.yandexcloud.net/support.rf/1000037_event_1736371173.2159429.jpg	0	56.82628312670369	60.602645874023445	4	4	1
1000038	t	2025-01-08	Субботник.	Субботник на территории школы.	https://storage.yandexcloud.net/support.rf/1000038_event_1736371207.5174043.jpg	30	56.82628312670369	60.602645874023445	4	4	10
1000035	t	2025-01-08	Сбор одежды для малоимущих.	Сбор одежды.	https://storage.yandexcloud.net/support.rf/1000035_event_1736371255.406484.jpg	0	54.96523570906144	82.86437988281251	3	3	5
1000036	f	2025-01-08	Организация музыкального концерта.	Музыкальный концерт.	https://storage.yandexcloud.net/support.rf/1000036_event_1736371312.3149576.jpg	50	54.96523570906144	82.86437988281251	3	3	7
1000033	f	2025-01-08	Уборка территорий в парке.	Уборка в парке.	https://storage.yandexcloud.net/support.rf/1000033_event_1736371364.2977953.jpg	20	59.85633305966	30.4072380065918	2	2	10
1000034	t	2025-01-08	Сбор книг для сельской библиотеки.	Сбор книг.	https://storage.yandexcloud.net/support.rf/1000034_event_1736371414.7498388.jpg	20	59.85633305966	30.4072380065918	2	2	9
1000031	t	2025-01-08	Помощь с доставкой продуктов пожилым людям.	Доставка продуктов.	https://storage.yandexcloud.net/support.rf/1000031_event_1736371474.89658.jpg	5	55.747559188419864	37.60105133056641	1	1	1
1000032	f	2025-01-08	Помощь в обучении школьников.	Обучение школьников.	https://storage.yandexcloud.net/support.rf/1000032_event_1736371527.015185.jpg	5	55.759055026070875	37.607231140136726	1	1	4
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organization (id, email, hashed_password, role, created_at, photo_url, name_organization, site_url, phone_1, phone_2, about, "FIO", id_city, id_type_organization, latitude, longitude, recovery_password_code) FROM stdin;
3	kindnesshub@yandex.ru	$2b$12$CNXJMCRAKJHUgfM1DTzqLuFbWqeE4G.S5NT4oHBfXc9L1W.jUiBbO	\N	2025-01-08	https://storage.yandexcloud.net/support.rf/3_profile_1736370175.1405873.jpg	Kindness Hub		+79994567890		Объединяем волонтеров.		3	2	\N	\N	\N
4	greenplanet@mail.ru	$2b$12$7cW.kanIBtizIXOdRZg2.O8oCnNGPFVGm2tnGLFVSHK7pU/izmOcK	\N	2025-01-08	https://storage.yandexcloud.net/support.rf/4_profile_1736370203.3997383.jpg	Green Planet	https://greenplanet.ru	+79995678901	+79996789012	Экологическая организация.		4	2	56.848332467376274	60.63903808593751	\N
5	helpingkids@gmail.com	$2b$12$Gh1iD4jxfMuXJ/Ol6zwPD.40bZsM44JIvES7ufMvrgGC03/ZzDcVq	\N	2025-01-08	https://storage.yandexcloud.net/support.rf/5_profile_1736370238.3671944.jpg	Helping Kids	https://helpingkids.com	+79997890123		Помощь детям.		5	2	55.779505494606575	49.151115417480476	\N
6	hopeforall@mail.ru	$2b$12$UQWmCiMs2ThsCa4qFzwPFuo3KI6qhlzKgXC9s.Tb9VjbY1JL4RLg2	\N	2025-01-08	https://storage.yandexcloud.net/support.rf/6_profile_1736370268.4855106.jpg	Hope for All		+79998901234	+79999012345	Помощь в сложных ситуациях.		6	2	56.31432316181497	44.00711059570313	\N
7	helpingheart@gmail.com	$2b$12$GZin65wyxNiQ6dGkFC0kx.tmFMeISLgt0hg9Ie0yqzCiCSgRnHJAC	\N	2025-01-08	https://storage.yandexcloud.net/support.rf/7_profile_1736370290.216365.jpg	Helping Heart	https://helpingheart.org	+79990123456		Организация для помощи сердцем.		7	2	55.146777229100195	61.37512207031251	\N
8	friendlyhands@yandex.ru	$2b$12$Z171Os2ZWCym7jZyGK7znOviLu76m09vMpnA13Do17dqsX0LGbon6	\N	2025-01-08	https://storage.yandexcloud.net/support.rf/8_profile_1736370315.5187895.jpg	Friendly Hands		+79991234567		Помощь ближним.		8	2	53.22345610717894	50.250091552734375	\N
9	futureisbright@mail.ru	$2b$12$omAYeLMClvRhwTirlZ1Kve6WJ2jKCKlw7ZNCfFg7VU7nJYvbg8peW	\N	2025-01-08	https://storage.yandexcloud.net/support.rf/9_profile_1736370341.1379077.jpg	Future is Bright	https://futureisbright.org	+79992345678	+79993456789	Создаем светлое будущее.		9	2	47.13386300177577	39.72244262695313	\N
10	newhope@gmail.com	$2b$12$FpoSYC7pv2WWWLTZImzhQ.ZMaGZ5g9VeOLt5zRCqT3eN.KHVEOjeG	\N	2025-01-08	https://storage.yandexcloud.net/support.rf/10_profile_1736370368.743523.jpg	New Hope	https://example.com/org10.jpg	+79994567890		Новая надежда.		10	2	54.721466320148174	55.93997955322266	\N
11	losdan322@gmail.com	$2b$12$ft7j9UYJeWTtjxfSjLDMXeZDPr1OPsK9QljjQb.4S6QhugfufZANG	admin	2025-01-08	https://storage.yandexcloud.net/support.rf/11_profile_1736363536.3700333.jpg		https://github.com/losdan77	+79606449196	+79606449199	Разработчик	Лосяков Даниил	1	1	55.8950235217548	37.429733276367195	\N
1	helpinghands@mail.ru	$2b$12$Tu714ipIRZnyRXUPhHxdrufGsdeZ9u6IuoHyyXtbxbQoGxwiRdJn.	\N	2025-01-08	https://storage.yandexcloud.net/support.rf/1_profile_1736370115.645694.jpg	Helping Hands	https://helpinghands.ru	+79991234567		Организация помощи людям.		1	2	55.750418370023	37.59813308715821	\N
2	volunteerforce@gmail.com	$2b$12$RSIB2OvdLX0dkre0TAHZSebn66R3LbKv8oCavqV0h06kh6A/CvNry	\N	2025-01-08	https://storage.yandexcloud.net/support.rf/2_profile_1736370148.2308633.jpg	Volunteer Force	https://volunteerforce.com	+79992345678	+79993456789	Волонтерская организация.		2	2	59.92411927339108	30.319519042968754	\N
\.


--
-- Data for Name: theme_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.theme_event (id, theme_event) FROM stdin;
1	Финансовая помощь
2	Здоровье
3	Социальная поддержка
4	Образование
5	Экология
\.


--
-- Data for Name: type_event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_event (id, type_event, id_theme_event) FROM stdin;
1	Сбор средств	1
2	Кроводача	2
3	Помощь пожилым	3
4	Образовательное мероприятие	4
5	Сбор вещей	1
6	Ремонт жилья	3
7	Организация праздников	4
8	Волонтерская помощь на месте	2
9	Помощь детям	3
10	Экологическая акция	5
\.


--
-- Data for Name: type_organization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type_organization (id, type_organization) FROM stdin;
1	Человек
2	Организация
\.


--
-- Name: city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.city_id_seq', 4, true);


--
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_id_seq', 524, true);


--
-- Name: event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_id_seq', 1000051, true);


--
-- Name: organization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organization_id_seq', 20, true);


--
-- Name: theme_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.theme_event_id_seq', 4, true);


--
-- Name: type_event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_event_id_seq', 6, true);


--
-- Name: type_organization_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_organization_id_seq', 2, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: city city_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (id);


--
-- Name: comment comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (id);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- Name: organization organization_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_email_key UNIQUE (email);


--
-- Name: organization organization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_pkey PRIMARY KEY (id);


--
-- Name: theme_event theme_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.theme_event
    ADD CONSTRAINT theme_event_pkey PRIMARY KEY (id);


--
-- Name: type_event type_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_event
    ADD CONSTRAINT type_event_pkey PRIMARY KEY (id);


--
-- Name: type_organization type_organization_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_organization
    ADD CONSTRAINT type_organization_pkey PRIMARY KEY (id);


--
-- Name: for_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX for_index ON public.comment USING btree (id_for);


--
-- Name: from_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX from_index ON public.comment USING btree (id_from);


--
-- Name: id_city_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX id_city_index ON public.event USING btree (id_city);


--
-- Name: id_organization_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX id_organization_index ON public.event USING btree (id_organization);


--
-- Name: id_type_event_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX id_type_event_index ON public.event USING btree (id_type_event);


--
-- Name: comment comment_id_for_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_id_for_fkey FOREIGN KEY (id_for) REFERENCES public.organization(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comment comment_id_from_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_id_from_fkey FOREIGN KEY (id_from) REFERENCES public.organization(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: event event_id_city_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_id_city_fkey FOREIGN KEY (id_city) REFERENCES public.city(id);


--
-- Name: event event_id_organization_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_id_organization_fkey FOREIGN KEY (id_organization) REFERENCES public.organization(id);


--
-- Name: event event_id_type_event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_id_type_event_fkey FOREIGN KEY (id_type_event) REFERENCES public.type_event(id);


--
-- Name: organization organization_id_city_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_id_city_fkey FOREIGN KEY (id_city) REFERENCES public.city(id);


--
-- Name: organization organization_id_type_organization_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organization_id_type_organization_fkey FOREIGN KEY (id_type_organization) REFERENCES public.type_organization(id);


--
-- Name: type_event type_event_id_theme_event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type_event
    ADD CONSTRAINT type_event_id_theme_event_fkey FOREIGN KEY (id_theme_event) REFERENCES public.theme_event(id);


--
-- PostgreSQL database dump complete
--

