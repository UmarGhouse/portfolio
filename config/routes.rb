Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'projects/index'
      post 'projects/create'
      put 'projects/update/:id', to: 'projects#update', as: 'projects_update'
      get 'projects/show/:id', to: 'projects#show', as: 'projects_show'
      delete 'projects/destroy/:id', to: 'projects#destroy', as: 'projects_destroy'
    end
  end

  root 'static_pages#home'
  get '/*path' => 'static_pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
