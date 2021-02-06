class AddDefaultToFeaturedColumn < ActiveRecord::Migration[6.0]
  def change
    change_column :active_storage_attachments, :featured, :boolean, default: false
  end
end
