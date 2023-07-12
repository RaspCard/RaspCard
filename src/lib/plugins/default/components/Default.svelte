<script lang="ts">
    import { Label, Input, Button } from "flowbite-svelte";
</script>

<span>Operazioni Saldo</span>
<Label class="space-y-2">
    <span>Importo</span>
    <Input min="0.01" step="0.01" type="number" name="amount" placeholder="0" required class="w-24 focus:border-secondary-button focus:ring-0"/>
</Label>
<Label class="space-y-2">
    <span>Cashback</span>
    <Input min="0" max="100" type="number" name="cashback" placeholder="0" class="w-24 focus:border-secondary-button focus:ring-0"/>
</Label>
<div class="flex flex-row gap-2">
    <Button type="submit" name="operationType" value="-" class="w-full bg-primary-button hover:bg-primary-button hover:opacity-90 focus:!ring-0 active:!ring-0">- Sottrai</Button>
    <Button type="submit" name="operationType" value="+" class="w-full !text-primary bg-secondary-button hover:bg-secondary-button hover:opacity-90 focus:!ring-0 active:!ring-0">+ Aggiungi</Button>
</div>