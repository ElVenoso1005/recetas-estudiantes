/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Recipe } from '../types/Recipe';
import recetasData from '../data/recetas.json';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoritesService';

interface RecipeContextType {
  recetas: Recipe[];
  favoritos: number[];
  addToFavoritos: (id: number) => void;
  removeFromFavoritos: (id: number) => void;
  isFavorito: (id: number) => boolean;
  addReceta: (receta: Omit<Recipe, 'id'>) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recetas, setRecetas] = useState<Recipe[]>(recetasData.recetas as Recipe[]);
  const [favoritos, setFavoritos] = useState<number[]>([]);

  //Cargar favoritos usando el servicio
  useEffect(() => {
    const favoritosGuardados = getFavorites();
    setFavoritos(favoritosGuardados);
  }, []);

  //Agregar favorito usando el servicio
  const addToFavoritos = (id: number) => {
    addFavorite(id);
    setFavoritos(prev => [...prev, id]);
  };

  //Remover favorito usando el servicio
  const removeFromFavoritos = (id: number) => {
    removeFavorite(id);
    setFavoritos(prev => prev.filter(favId => favId !== id));
  };

  const isFavorito = (id: number) => {
    return favoritos.includes(id);
  };

  const addReceta = (nuevaReceta: Omit<Recipe, 'id'>) => {
    const newId = Math.max(...recetas.map(r => r.id)) + 1;
    const receta: Recipe = {
      ...nuevaReceta,
      id: newId
    };
    setRecetas(prev => [...prev, receta]);
  };

  const value = {
    recetas,
    favoritos,
    addToFavoritos,
    removeFromFavoritos,
    isFavorito,
    addReceta,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};
