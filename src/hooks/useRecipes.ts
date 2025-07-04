import { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import type { Recipe } from '../types/Recipe';

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes debe ser usado dentro de un RecipeProvider');
  }

  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);

  const filterByDifficulty = (difficulty: 'Facil' | 'Intermedio' | 'Dificil') => {
    setDifficultyFilter(difficulty);
  };

  const filteredRecetas = difficultyFilter
    ? context.recetas.filter(
        (recipe: Recipe) => recipe.dificultad === difficultyFilter
      )
    : context.recetas;

  return {
    ...context,
    recetas: filteredRecetas,
    difficultyFilter,
    filterByDifficulty,
  };
};
