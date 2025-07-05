import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArtistGrid from '../components/home/ArtistGrid';
import ArtistCarousel from '../components/home/ArtistCarousel';
import Section from '../components/Section';
import styles from '../styles/Home.module.css';     

const Home = () => {
    return (
        <>
            <Header />

            {/* Hero Section */}
            <div className={`hero-section ${styles.heroSection}`}>
                <h1 className={`text-center ${styles.title}`}>RITMOS DA RESISTÊNCIA</h1>

                <Section className="about-site">
                    <div className="col-md-8 mx-auto text-center">
                        <h2 className={`${styles.title}`}>O que é o Ritmos da Resistência?</h2>
                        <p className={`lead ${styles.leadText}`}>
                            O <strong>Ritmos da Resistência</strong> é um movimento que celebra a música negra
                            como forma de expressão, resistência e transformação. Nosso objetivo é apoiar artistas
                            independentes, dar visibilidade às suas histórias e conectar o público com a riqueza
                            cultural da música.
                        </p>
                    </div>
                </Section>
            </div>

            {/* Seção Música como Resistência */}
            <Section title="A Música como Resistência">
                <p className={`text-center ${styles.paragraph}`}>
                    Desde os tempos da escravidão, a música tem sido uma ferramenta poderosa de expressão e
                    comunicação para a comunidade negra. Ritmos como o samba, o maracatu e o afoxé carregam em
                    suas notas a história de luta e resistência de um povo. Durante a ditadura militar no Brasil,
                    a música também se tornou um símbolo de protesto, com artistas usando suas letras para desafiar
                    a censura e inspirar mudanças.
                </p>
            </Section>

            {/* Seção Quim Negro */}
            <Section>
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <h3 className={`text-center ${styles.sectionTitle}`}>Quim Negro: Um Símbolo de Resistência</h3>
                        <p className={`text-center ${styles.paragraph}`}>
                            Quim Negro, codinome do sambista Joaquim Theodoro, foi um dos artistas mais
                            censurados durante a ditadura militar. Suas músicas, que abordavam temas como a
                            espiritualidade do candomblé e a luta contra a opressão, se tornaram um símbolo de
                            resistência cultural. Mesmo diante da censura, suas letras continuaram a inspirar e
                            mobilizar a população.

                            Quim Negro denunciava a violência policial, exaltava a beleza e a força do
                            negro brasileiro e promovia reflexões sobre religiões como o candomblé e a umbanda.
                            Apesar de levar uma vida singela e ser praticamente desconhecido pelo grande público, ele foi                    um exemplo de como a arte pode ser uma das maiores ferramentas no universo político.
                            Suas composições resistiram ao silenciamento imposto pela censura e se tornaram símbolos de luta,
                            expressão cultural e afirmação identitária.
                        </p>
                    </div>
                    <div className="col-md-4 text-center">
                        <img
                            src="/assets/salve-a-crianca.jpg"
                            alt="Quim Negro"
                            className="img-fluid rounded shadow"
                            style={{ maxWidth: '200px' }}
                        />
                    </div>
                </div>
            </Section>

            {/* Call to Action */}
            <Section className="call-to-action">
                <div className="col-md-8 mx-auto text-center">
                    <h2 className={styles.sectionTitle}>Faça Parte Dessa História</h2>
                    <p className={`lead ${styles.leadText}`}>
                        Se você é um artista independente e quer divulgar sua música, o <strong>Ritmos da
                            Resistência</strong> é o lugar certo para você. Cadastre-se agora e faça parte dessa
                        rede de apoio e visibilidade.
                    </p>
                    <a href="/pages/formulario" className={`btn ${styles.button}`}>Cadastre sua música</a>
                </div>
            </Section>

            {/* Artistas Nacionais */}
            <Section title="Artistas Nacionais">
                <p className={`lead text-center ${styles.leadText}`}>
                    A música brasileira é rica em diversidade e talento. Aqui, destacamos alguns dos artistas
                    nacionais que carregam em suas obras a força e a resistência da cultura negra. Conheça esses
                    nomes que inspiram e transformam a cena musical do país.
                </p>
            </Section>

            <ArtistGrid />

            {/* Artistas Internacionais */}
            <Section title="Artistas Internacionais">
                <p className={`lead text-center ${styles.leadText}`}>
                    A música transcende fronteiras e influencia artistas ao redor do mundo. Conheça alguns dos nomes
                    internacionais que carregam em suas obras a força e a resistência da cultura negra, inspirando
                    milhões com suas histórias e talento.
                </p>
            </Section>

            <ArtistCarousel />

            <Footer />
        </>
    );
};

export default Home;