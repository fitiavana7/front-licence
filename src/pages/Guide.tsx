import { Badge, Card } from 'antd';
import React from 'react';
import { FiInfo } from 'react-icons/fi';

const Guide = () => {
    return (
        <>
            <div className='flex justify-between items-center w-full py-3'>
                <h3 className='text-lg flex items-center font-bold text-primary'>
                    <FiInfo  className='mr-2'/>    
                    GUIDES D'UTILISATION
                </h3>
            </div>
            <Card className='my-3'>
                <div className='flex items-center'>
                    <span className='bg-blue-500 p-2 rounded-full text-white text-center font-bold'>01</span>
                    <p className='font-bold text-lg ml-2'>Créer des salariés</p>
                </div>
                <p className='text-justify py-2'>
                    Créer un salarié dans notre application est simple et rapide. Il vous suffit de renseigner les informations essentielles telles que le nom, le poste, le salaire, et les avantages. En quelques clics, votre nouveau salarié est ajouté, et vous pouvez immédiatement gérer ses fiches de paie, ses congés, et ses retenues, tout en assurant une gestion précise et conforme.
                </p>                
            </Card>
            <Card className='my-3'>
                <div className='flex items-center'>
                    <span className='bg-blue-500 p-2 rounded-full text-white text-center font-bold'>02</span>
                    <p className='font-bold text-lg ml-2'>Créer des metiers</p>
                </div>
                <p className='text-justify py-2'>
                    Créer des métiers dans notre application est simple et flexible. Vous pouvez définir le titre du métier, indiquer s'il s'agit d'un poste de direction, et ajouter une description détaillée. Cette fonctionnalité vous permet de structurer efficacement les rôles au sein de votre entreprise, tout en offrant une clarté maximale sur les responsabilités et les attentes liées à chaque métier.
                </p>
            </Card>
            <Card className='my-3'>
                <div className='flex items-center'>
                    <span className='bg-blue-500 p-2 rounded-full text-white text-center font-bold'>03</span>
                    <p className='font-bold text-lg ml-2'>Configurer le salaire d'un salarié</p>
                </div>
                <p className='text-justify py-2'>
                    La configuration des salaires dans notre application est précise et personnalisable. Pour chaque salarié, vous pouvez définir son métier, la valeur de son salaire, la date de changement de salaire, ainsi que d'autres paramètres essentiels. Cette flexibilité vous permet de gérer les évolutions salariales avec facilité, en assurant une mise à jour rapide et précise des informations pour chaque employé.
                </p>
            </Card>
            <Card className='my-3'>
                <div className='flex items-center'>
                    <span className='bg-blue-500 p-2 rounded-full text-white text-center font-bold'>04</span>
                    <p className='font-bold text-lg ml-2'>Payer son salaire</p>
                </div>
                <p className='text-justify py-2'>
                    Lors du paiement des salaires dans notre application, vous pouvez facilement indiquer s'il y a un décaissement, en précisant sa valeur et une description. De même, pour les primes ou bonus, vous pouvez ajouter un titre et une description du paiement. Cette fonctionnalité vous permet de suivre précisément toutes les transactions financières liées à chaque salarié, en assurant une gestion claire et transparente.
                </p>
            </Card>
        </>
    );
};

export default Guide;