<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BranchController extends Controller
{
    public function index()
    {
        $branches = Branch::all();
        return Inertia::render('Branches/Index', [
            'branches' => $branches
        ]);
    }

    public function create()
    {
        return Inertia::render('Branches/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Branch::create($validated);

        return redirect()->route('branches.index');
    }

    public function edit(Branch $branch)
    {
        return Inertia::render('Branches/Edit', [
            'branch' => $branch
        ]);
    }

    public function update(Request $request, Branch $branch)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $branch->update($validated);

        return redirect()->route('branches.index');
    }

    public function destroy(Branch $branch)
    {
        $branch->delete();

        return redirect()->route('branches.index');
    }
}
