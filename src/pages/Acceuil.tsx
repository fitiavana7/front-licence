import React from 'react';

const Acceuil = () => {
    return (
        <div className='home min-h-screen w-full'>
            <div className='flex justify-center items-center w-full h-screen'>
                <div className='w-1/2'>
                    <p className='text-center text-5xl font-bold'>APPLICATION GESTION DES SALAIRES</p>
                    <p className='text-center text-2xl'>par VISIONS ADDITIONNELLES</p>
                    <p className='text-justify py-9'>
                        Découvrez notre application de gestion des salaires, conçue pour simplifier et automatiser l'ensemble de vos processus de paie. Avec notre solution, dites adieu aux erreurs de calcul et aux tâches répétitives. Notre application vous permet de gérer facilement les salaires, les primes, les retenues, et bien plus encore, tout en restant conforme aux réglementations en vigueur. Offrez à vos employés la possibilité de consulter leurs fiches de paie en ligne, de suivre leurs heures travaillées et de gérer leurs avantages, le tout en quelques clics. Gagnez du temps, améliorez votre productivité et assurez une paie précise et rapide chaque mois. Faites confiance à notre application pour transformer la gestion des salaires en une expérience fluide et efficace pour votre entreprise.                    </p>
                </div>
            </div>
        </div>
    );
};

export default Acceuil;