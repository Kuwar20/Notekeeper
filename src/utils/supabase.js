
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase
        

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

import { getUserId } from "./userId";

const userId = getUserId();

export const notesService = {
  async fetchNotes() {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId) // Filter by user ID
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async addNote(note) {
    const { error } = await supabase
      .from("notes")
      .insert({ ...note, user_id: userId }); // Include user ID
    if (error) throw error;
  },

  async updateNote(id, note) {
    const { error } = await supabase
      .from("notes")
      .update(note)
      .eq("id", id)
      .eq("user_id", userId); // Ensure user ID matches
    if (error) throw error;
  },

  async deleteNote(id) {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id)
      .eq("user_id", userId); // Ensure user ID matches
    if (error) throw error;
  },

  async togglePin(id, isPinned) {
    const { error } = await supabase
      .from("notes")
      .update({ pinned: !isPinned })
      .eq("id", id)
      .eq("user_id", userId); // Ensure user ID matches
    if (error) throw error;
  }
};
