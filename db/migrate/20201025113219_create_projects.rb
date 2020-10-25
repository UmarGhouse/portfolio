class CreateProjects < ActiveRecord::Migration[6.0]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.text :description
      t.string :repo_url
      t.integer :status

      t.timestamps
    end
  end
end
