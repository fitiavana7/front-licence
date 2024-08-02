export const GenreData : SelectDataType[] = [
    {
        label : 'Homme' ,
        value : 'homme'
    },
    {
        label : 'Femme',
        value : 'femme'
    }
]

export const MatrimonialeData : SelectDataType[] = [
    {
        label : 'Celibataire' ,
        value : 'Celibataire'
    },
    {
        label : 'Marié',
        value : 'Marié'
    },
    {
        label : 'Divorcé',
        value : 'Divorcé'
    }
]

export interface SelectDataType {
    label : string , value : string
}