import { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function Todos(){
  return (
    <>
      <button className="btn btn-primary">
        New Todo
      </button>
      <dialog className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New Todo</h3>
          <form>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Name of Todo</span>
              </div>
              <input type="text" placeholder="Type here" class="input input-bordered w-full" />
            </label>
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Description</span>
              </div>
              <input type="text" placeholder="Type here" class="input input-bordered w-full"  />
            </label>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Create Todo</button>
              <button type="button" className="btn btn-ghost">Close</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
