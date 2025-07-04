import React from 'react';
import { useRecipes } from '../hooks/useRecipes';

const StatsPage: React.FC = () => {
  const { recetas } = useRecipes();

  const totalRecetas = recetas.length;

  const recetasPorCategoria = {
    Fácil: recetas.filter(r => r.dificultad === 'fácil').length,
    Intermedio: recetas.filter(r => r.dificultad === 'medio').length,
    Difícil: recetas.filter(r => r.dificultad === 'difícil').length,
  };
  const recetaPopular = recetas.reduce((prev, current) =>
    prev.valoracion > current.valoracion ? prev : current
  );

  return (
    <div className="container mt-4">
      <h1>📊 Estadísticas</h1>
      <ul>
        <li>Total de recetas: {totalRecetas}</li>
        <li>Recetas fáciles: {recetasPorCategoria.Fácil}</li>
        <li>Recetas intermedias: {recetasPorCategoria.Intermedio}</li>
        <li>Recetas difíciles: {recetasPorCategoria.Difícil}</li>
        <li>Receta más popular: {recetaPopular.nombre} ({recetaPopular.valoracion}⭐)</li>
      </ul>
    </div>
  );
};

export default StatsPage;
