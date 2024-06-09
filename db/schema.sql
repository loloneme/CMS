--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-06-09 19:33:31

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
-- TOC entry 216 (class 1259 OID 18183)
-- Name: actor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.actor (
    id integer NOT NULL,
    fullname text NOT NULL
);


ALTER TABLE public.actor OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 18182)
-- Name: actor_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.actor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.actor_id_seq OWNER TO postgres;

--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 215
-- Name: actor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.actor_id_seq OWNED BY public.actor.id;


--
-- TOC entry 226 (class 1259 OID 18247)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 18246)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_id_seq OWNER TO postgres;

--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 225
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- TOC entry 224 (class 1259 OID 18229)
-- Name: cinema; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cinema (
    id integer NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    category_id bigint NOT NULL,
    phone text NOT NULL,
    image bytea
);


ALTER TABLE public.cinema OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 18228)
-- Name: cinema_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cinema_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cinema_id_seq OWNER TO postgres;

--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 223
-- Name: cinema_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cinema_id_seq OWNED BY public.cinema.id;


--
-- TOC entry 239 (class 1259 OID 18447)
-- Name: country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.country (
    id integer NOT NULL,
    country text NOT NULL
);


ALTER TABLE public.country OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 18446)
-- Name: country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.country_id_seq OWNER TO postgres;

--
-- TOC entry 4984 (class 0 OID 0)
-- Dependencies: 238
-- Name: country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.country_id_seq OWNED BY public.country.id;


--
-- TOC entry 222 (class 1259 OID 18213)
-- Name: movie; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie (
    id integer NOT NULL,
    name text NOT NULL,
    director text,
    operator text,
    image bytea NOT NULL,
    premiere date NOT NULL,
    year bigint NOT NULL,
    description text NOT NULL,
    rating text NOT NULL,
    duration bigint NOT NULL
);


ALTER TABLE public.movie OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 18212)
-- Name: film_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.film_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.film_id_seq OWNER TO postgres;

--
-- TOC entry 4985 (class 0 OID 0)
-- Dependencies: 221
-- Name: film_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.film_id_seq OWNED BY public.movie.id;


--
-- TOC entry 230 (class 1259 OID 18265)
-- Name: genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genre (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.genre OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 18264)
-- Name: genre_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.genre_id_seq OWNER TO postgres;

--
-- TOC entry 4986 (class 0 OID 0)
-- Dependencies: 229
-- Name: genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genre_id_seq OWNED BY public.genre.id;


--
-- TOC entry 220 (class 1259 OID 18206)
-- Name: hall; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hall (
    id integer NOT NULL,
    cinema_id bigint NOT NULL,
    seats bigint NOT NULL,
    name text NOT NULL,
    hall_category_id bigint NOT NULL
);


ALTER TABLE public.hall OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 18478)
-- Name: hall_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hall_category (
    id integer NOT NULL,
    hall_category text NOT NULL
);


ALTER TABLE public.hall_category OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 18477)
-- Name: hall_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hall_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hall_category_id_seq OWNER TO postgres;

--
-- TOC entry 4987 (class 0 OID 0)
-- Dependencies: 241
-- Name: hall_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hall_category_id_seq OWNED BY public.hall_category.id;


--
-- TOC entry 219 (class 1259 OID 18205)
-- Name: hall_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hall_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hall_id_seq OWNER TO postgres;

--
-- TOC entry 4988 (class 0 OID 0)
-- Dependencies: 219
-- Name: hall_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hall_id_seq OWNED BY public.hall.id;


--
-- TOC entry 237 (class 1259 OID 18414)
-- Name: movie_actor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_actor (
    movie_id bigint NOT NULL,
    actor_id bigint NOT NULL
);


ALTER TABLE public.movie_actor OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 18455)
-- Name: movie_country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_country (
    movie_id bigint NOT NULL,
    country_id bigint NOT NULL
);


ALTER TABLE public.movie_country OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 18379)
-- Name: movie_genre; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_genre (
    movie_id bigint NOT NULL,
    genre_id bigint NOT NULL
);


ALTER TABLE public.movie_genre OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 18384)
-- Name: movie_studio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_studio (
    movie_id bigint NOT NULL,
    studio_id bigint NOT NULL
);


ALTER TABLE public.movie_studio OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 18274)
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    id integer NOT NULL,
    hall_id bigint NOT NULL,
    movie_id bigint NOT NULL,
    date timestamp(0) with time zone NOT NULL,
    cost bigint NOT NULL,
    booked_seats bigint NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 18273)
-- Name: repertoire_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.repertoire_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.repertoire_id_seq OWNER TO postgres;

--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 231
-- Name: repertoire_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.repertoire_id_seq OWNED BY public.session.id;


--
-- TOC entry 228 (class 1259 OID 18256)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 18255)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_seq OWNER TO postgres;

--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 227
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 218 (class 1259 OID 18197)
-- Name: studio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.studio (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.studio OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 18196)
-- Name: studio_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.studio_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.studio_id_seq OWNER TO postgres;

--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 217
-- Name: studio_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.studio_id_seq OWNED BY public.studio.id;


--
-- TOC entry 234 (class 1259 OID 18286)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    fullname text NOT NULL,
    phone text NOT NULL,
    role_id bigint NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    cinema_id bigint
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 18285)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 4992 (class 0 OID 0)
-- Dependencies: 233
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 4759 (class 2604 OID 18186)
-- Name: actor id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actor ALTER COLUMN id SET DEFAULT nextval('public.actor_id_seq'::regclass);


--
-- TOC entry 4764 (class 2604 OID 18250)
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- TOC entry 4763 (class 2604 OID 18232)
-- Name: cinema id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cinema ALTER COLUMN id SET DEFAULT nextval('public.cinema_id_seq'::regclass);


--
-- TOC entry 4769 (class 2604 OID 18450)
-- Name: country id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country ALTER COLUMN id SET DEFAULT nextval('public.country_id_seq'::regclass);


--
-- TOC entry 4766 (class 2604 OID 18268)
-- Name: genre id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre ALTER COLUMN id SET DEFAULT nextval('public.genre_id_seq'::regclass);


--
-- TOC entry 4761 (class 2604 OID 18209)
-- Name: hall id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hall ALTER COLUMN id SET DEFAULT nextval('public.hall_id_seq'::regclass);


--
-- TOC entry 4770 (class 2604 OID 18481)
-- Name: hall_category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hall_category ALTER COLUMN id SET DEFAULT nextval('public.hall_category_id_seq'::regclass);


--
-- TOC entry 4762 (class 2604 OID 18216)
-- Name: movie id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie ALTER COLUMN id SET DEFAULT nextval('public.film_id_seq'::regclass);


--
-- TOC entry 4765 (class 2604 OID 18259)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 4767 (class 2604 OID 18277)
-- Name: session id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.repertoire_id_seq'::regclass);


--
-- TOC entry 4760 (class 2604 OID 18200)
-- Name: studio id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studio ALTER COLUMN id SET DEFAULT nextval('public.studio_id_seq'::regclass);


--
-- TOC entry 4768 (class 2604 OID 18289)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 4772 (class 2606 OID 18190)
-- Name: actor actor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actor
    ADD CONSTRAINT actor_pkey PRIMARY KEY (id);


--
-- TOC entry 4789 (class 2606 OID 18545)
-- Name: category categore_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT categore_name_unique UNIQUE (name);


--
-- TOC entry 4791 (class 2606 OID 18254)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- TOC entry 4787 (class 2606 OID 18236)
-- Name: cinema cinema_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cinema
    ADD CONSTRAINT cinema_pkey PRIMARY KEY (id);


--
-- TOC entry 4809 (class 2606 OID 18454)
-- Name: country country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);


--
-- TOC entry 4783 (class 2606 OID 18222)
-- Name: movie film_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT film_name_unique UNIQUE (name);


--
-- TOC entry 4785 (class 2606 OID 18220)
-- Name: movie film_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT film_pkey PRIMARY KEY (id);


--
-- TOC entry 4795 (class 2606 OID 18272)
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- TOC entry 4815 (class 2606 OID 18547)
-- Name: hall_category hall_category_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hall_category
    ADD CONSTRAINT hall_category_name_unique UNIQUE (hall_category);


--
-- TOC entry 4817 (class 2606 OID 18485)
-- Name: hall_category hall_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hall_category
    ADD CONSTRAINT hall_category_pkey PRIMARY KEY (id);


--
-- TOC entry 4781 (class 2606 OID 18211)
-- Name: hall hall_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hall
    ADD CONSTRAINT hall_pkey PRIMARY KEY (id);


--
-- TOC entry 4807 (class 2606 OID 18418)
-- Name: movie_actor movie_actor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_actor
    ADD CONSTRAINT movie_actor_pkey PRIMARY KEY (movie_id, actor_id);


--
-- TOC entry 4813 (class 2606 OID 18459)
-- Name: movie_country movie_country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_country
    ADD CONSTRAINT movie_country_pkey PRIMARY KEY (movie_id, country_id);


--
-- TOC entry 4803 (class 2606 OID 18383)
-- Name: movie_genre movie_genre_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genre
    ADD CONSTRAINT movie_genre_pkey PRIMARY KEY (movie_id, genre_id);


--
-- TOC entry 4805 (class 2606 OID 18388)
-- Name: movie_studio movie_studio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_studio
    ADD CONSTRAINT movie_studio_pkey PRIMARY KEY (movie_id, studio_id);


--
-- TOC entry 4799 (class 2606 OID 18279)
-- Name: session repertoire_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT repertoire_pkey PRIMARY KEY (id);


--
-- TOC entry 4793 (class 2606 OID 18263)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 4776 (class 2606 OID 18204)
-- Name: studio studio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studio
    ADD CONSTRAINT studio_pkey PRIMARY KEY (id);


--
-- TOC entry 4774 (class 2606 OID 18430)
-- Name: actor unique_actor_fullname; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actor
    ADD CONSTRAINT unique_actor_fullname UNIQUE (fullname);


--
-- TOC entry 4811 (class 2606 OID 18471)
-- Name: country unique_country; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT unique_country UNIQUE (country);


--
-- TOC entry 4797 (class 2606 OID 18432)
-- Name: genre unique_genre_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT unique_genre_name UNIQUE (name);


--
-- TOC entry 4778 (class 2606 OID 18434)
-- Name: studio unique_studio_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studio
    ADD CONSTRAINT unique_studio_name UNIQUE (name);


--
-- TOC entry 4801 (class 2606 OID 18293)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 4779 (class 1259 OID 18543)
-- Name: fki_hall_cinema_id_foreign; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_hall_cinema_id_foreign ON public.hall USING btree (cinema_id);


--
-- TOC entry 4820 (class 2606 OID 18349)
-- Name: cinema cinema_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cinema
    ADD CONSTRAINT cinema_category_id_foreign FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- TOC entry 4829 (class 2606 OID 18424)
-- Name: movie_actor fk_actor_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_actor
    ADD CONSTRAINT fk_actor_id FOREIGN KEY (actor_id) REFERENCES public.actor(id) ON DELETE CASCADE;


--
-- TOC entry 4831 (class 2606 OID 18465)
-- Name: movie_country fk_country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_country
    ADD CONSTRAINT fk_country_id FOREIGN KEY (country_id) REFERENCES public.country(id) ON DELETE CASCADE;


--
-- TOC entry 4825 (class 2606 OID 18399)
-- Name: movie_genre fk_genre_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genre
    ADD CONSTRAINT fk_genre_id FOREIGN KEY (genre_id) REFERENCES public.genre(id) ON DELETE CASCADE;


--
-- TOC entry 4818 (class 2606 OID 18486)
-- Name: hall fk_hall_category_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hall
    ADD CONSTRAINT fk_hall_category_id FOREIGN KEY (hall_category_id) REFERENCES public.hall_category(id) ON DELETE CASCADE;


--
-- TOC entry 4826 (class 2606 OID 18394)
-- Name: movie_genre fk_movie_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genre
    ADD CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES public.movie(id) ON DELETE CASCADE;


--
-- TOC entry 4827 (class 2606 OID 18404)
-- Name: movie_studio fk_movie_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_studio
    ADD CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES public.movie(id) ON DELETE CASCADE;


--
-- TOC entry 4830 (class 2606 OID 18419)
-- Name: movie_actor fk_movie_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_actor
    ADD CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES public.movie(id) ON DELETE CASCADE;


--
-- TOC entry 4832 (class 2606 OID 18460)
-- Name: movie_country fk_movie_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_country
    ADD CONSTRAINT fk_movie_id FOREIGN KEY (movie_id) REFERENCES public.movie(id) ON DELETE CASCADE;


--
-- TOC entry 4828 (class 2606 OID 18409)
-- Name: movie_studio fk_studio_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_studio
    ADD CONSTRAINT fk_studio_id FOREIGN KEY (studio_id) REFERENCES public.studio(id) ON DELETE CASCADE;


--
-- TOC entry 4819 (class 2606 OID 18538)
-- Name: hall hall_cinema_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hall
    ADD CONSTRAINT hall_cinema_id_foreign FOREIGN KEY (cinema_id) REFERENCES public.cinema(id) ON DELETE CASCADE;


--
-- TOC entry 4821 (class 2606 OID 18592)
-- Name: session session_hall_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_hall_id_foreign FOREIGN KEY (hall_id) REFERENCES public.hall(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4822 (class 2606 OID 18597)
-- Name: session session_movie_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_movie_id_foreign FOREIGN KEY (movie_id) REFERENCES public.movie(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4823 (class 2606 OID 18621)
-- Name: user user_cinema_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_cinema_foreign FOREIGN KEY (cinema_id) REFERENCES public.cinema(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 4824 (class 2606 OID 18626)
-- Name: user user_role_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_role_foreign FOREIGN KEY (role_id) REFERENCES public.role(id) ON DELETE CASCADE NOT VALID;


-- Completed on 2024-06-09 19:33:32

--
-- PostgreSQL database dump complete
--

