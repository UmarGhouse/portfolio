class AddColourToSkills < ActiveRecord::Migration[6.0]
  def change
    add_column :skills, :colour, :string
  end
end
