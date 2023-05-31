# Task

Одно или несколько простейший действий. **Task** должен либо выполниться, либо выбросить ошибку без попытки ее обработки. <br>

**Task** наследуется от базового класса и реализует весь свой функционал через шаблонный метод `start`.<br>

Если **Task** достаточно длительный (например, `MovementTask`), то он реализует метод `stop` для остановки выполнения.<br>