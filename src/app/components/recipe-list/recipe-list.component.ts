import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient';
import { Recipe } from 'src/app/models/recipe';
import { AppState } from 'src/app/store/app.state';
import * as RecipeActions from '../../store/recipe.actions';
import * as IngredientActions from '../../store/ingredient.actions';
import {
  selectAllRecipes,
  selectOneRecipeBasedOnID,
} from '../../store/recipe.selector';
import { selectAllIngredients } from 'src/app/store/ingredient.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Observable<readonly Recipe[]> = of([]);
  selectedRecipe: Observable<Recipe> = of();
  RecipeToShow: Recipe | undefined;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(RecipeActions.loadAllRecipes());
    this.recipes = this.store.select(selectAllRecipes);
  }

  selectSpecificRecipe(recipe: Recipe) {
    if (recipe) {
      this.store.dispatch(RecipeActions.selectRecipe({ recipeID: recipe.id }));
      this.RecipeToShow = recipe;
    }
  }
}
